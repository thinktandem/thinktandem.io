---
layout: layouts/article.html
title: "Migrating Drupal 7 Organic Groups to Drupal 8 Group"
tags: development, drupal
permalink: true
seo:
  description: byline
  keywords: tags
author: John Ouellet
private: false
mainImage: images/articles/migrate-group.jpg
img-src: images/articles/migrate-group.jpg
byline: Migrating Drupal 7 Organic Groups to Drupal 8 Group takes a little bit of effort and migration elbow grease.
date: 2018-03-30
---

Use Case for this Migration
---------------------------

We are currently helping a university client migrate their intranet to Drupal 8.  The intranet was built with [Open Atrium](https://www.drupal.org/project/openatrium) in Drupal 7.  Unfortunately there is no Open Atrium Drupal 8 version and they wanted to go a different route with the rebuild.   One of the main components of Open Atrium is [Organic Groups](https://www.drupal.org/project/og).  The Drupal 8 version of Organic Groups is [still under development](https://github.com/Gizra/og) at the time of their migration.  Due to this, we decided to use the [Group](https://www.drupal.org/project/group) module instead during this build.

The Group module is similar to Organic Groups in that it provides group like permissions per content and user.  One of the main differences is that the Group module is all encompassing.  It provides a central location to manager all your group types, groups, users, relations, etc.  It also comes with a full suite of services and classes that can be used in your code.  To wrap your head around it, [here is an older video](https://www.youtube.com/watch?v=GkiCLJk5n0s) that [Mike Anello](https://www.drupaleasy.com/users/ultimike) of Druapl Easy made.

We also needed to be able to utilize the workflow of our nodes and users similar to how Organic Groups functioned.  We would not be adding people and nodes via the Group interface, but instead with Entity Reference fields on the nodes and users.  We also needed to be able to add nodes and users to multiple groups as well.  A little different than the typical Group workflow, but still the same end result.

So now that we know what the task is before us, let us get down to the nitty gritty of this migration.  It will take a good amount of code and some intermediate knowledge of Drupal migration mechanisms.

Migrating Organic Groups to Group
---------------------------------

### Setup Group on Drupal 8

Before we migrate any data, we need to setup the group module on our Drupal 8 site.  Use ```composer require drupal/group`` and enable the module with ```drush en group```.  The Drupal 7 site happens to use both Organic Group Group and Organic Group Spaces, so we will need to migrate all of those entities.  To simplify things, I went to ```/admin/group/types``` and created two group types: Groups and Spaces.

Now that our group types are setup, we can begin adding groups to the site via migration.  Organic Groups in Drupal 7 were essentially node references that were used on whatever entity you needed to control permissions on.  So with that knowledge, I knew I had to migrate the two content types: ```oa_group``` and ```oa_space```.  Most people only use the group potion of Organic Groups, so you can disregard any code around the Spaces functionality going forward if need be.

I took the two migration yamls for the two content types and tweaked them to go into our groups.  We really only needed three fields to do this: id, label, and path.  The id is the nid, the label is the title, and so we needed to create the path based off the title.  I used ```hook_migrate_prepare_row``` in a custom module to do this for us.

```php
use Drupal\migrate\Plugin\MigrationInterface;
use Drupal\migrate\Plugin\MigrateSourceInterface;
use Drupal\migrate\Row;
use Drupal\Component\Utility\Html;

/**
 * Implements hook_migrate_prepare_row().
 */
function YOUR_MODULE_migrate_prepare_row(Row $row, MigrateSourceInterface $source, MigrationInterface $migration) {

  switch ($migration->id()) {
    case 'upgrade_d7_node_oa_group':
    case 'upgrade_d7_node_oa_space':
      // Slugify the title then set that as the alias for the group
      $title = $row->getSourceProperty('title');
      $alias = Html::cleanCssIdentifier($title);
      $alias = '/'. strtolower($alias);
      $row->setSourceProperty('alias', $alias);

      break;
  }
}
```

As you can see, I am basically grabbing the title, and then slugifying it into a url.  this way we have a new alias based off our title.  Having an alias for a group is different than Organic Groups because every Group has its own landing page basically.  When you view a Group, there are multiple actions that can be taken, like viewing the nodes and users.  This is the all encompassing feature I mentioned earlier.

So now that we have the mechanism to import the Organic Groups, now we need to setup our YAML file to handle the actual migration of the groups.

```yaml
langcode: en
status: true
dependencies: {  }
id: upgrade_d7_node_oa_group
class: Drupal\migrate\Plugin\Migration
field_plugin_method: null
cck_plugin_method: null
migration_tags:
  - 'Drupal 7'
migration_group: insert_group
label: 'Insert OA Group'
source:
  plugin: d7_node
  node_type: oa_group
process:
  type:
    plugin: default_value
    default_value: groups
  id: nid
  label: title
  path: alias
destination:
  plugin: 'entity:group'
migration_dependencies: null
```

```yaml
langcode: en
status: true
dependencies: {  }
id: upgrade_d7_node_oa_space
class: Drupal\migrate\Plugin\Migration
field_plugin_method: null
cck_plugin_method: null
migration_tags:
  - 'Drupal 7'
migration_group: insert_group
label: 'Insert OA Space'
source:
  plugin: d7_node
  node_type: oa_space
process:
  type:
    plugin: default_value
    default_value: spaces
  id: nid
  label: title
  path: alias
destination:
  plugin: 'entity:group'
migration_dependencies: null
```

So as you can see from both YAMLs it is too different than a typical content migration tasks with a few exceptions.  The magic is happening in the process portion of these YAML migration files.  In the ```type``` key I am specifying the group type I setup earlier.  I am then mapping the 3 fields accordingly and using the Group ```destination``` plugin.  If you ever need to see what entity plugins are available, you can use [Drupal Console](https://drupalconsole.com/) and run ```drupal debug:entity``` from your cli.

So that is it for setting up the Group entities themselves.  Once I run ```drush mim --group=insert_group``` all my Drupal 7 Organic Groups will be migrated as Drupal 8 Groups.

### Migrate the Users

So here is where more heavy duty coding comes into play.  We have to overcome a few obstacles here to get the users to migrate and become members of the respective groups.  Two of the obstacles I found were: getting the user Organic Group data and adding the user post save of the migration.  Let's go over how we can overcome the first obstacle.

When I was looking at the data in the database of the Drupal 7 site, it seemed that the Organic Groups entity reference fields were not storing the data in their field tables.  All the data was stored in two tables instead: ```og_membership``` and ```og_users_roles```.  So I couldn;t just map the source field data to the process field like usual, I had to create the mapping.
