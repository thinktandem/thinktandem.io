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

When I was looking at the data in the database of the Drupal 7 site, it seemed that the Organic Groups entity reference fields were not storing the data in their field tables.  All the data was stored in two tables instead: ```og_membership``` and ```og_users_roles```.  So I couldn't just map the source field data to the process field like usual, I had to create the mapping.  We can do this by extending out source plugin as follows:

```php
namespace Drupal\YOUR_MODULE\Plugin\migrate\source;

use Drupal\user\Plugin\migrate\source\d7\User;
use Drupal\migrate\Row;

/**
 * Extends the D7 Node source plugin so we can grab OG info.
 *
 * @MigrateSource(
 *   id = "d7_group_user",
 *   source_module = "user"
 * )
 */
class GroupUser extends User {

  /**
   * {@inheritdoc}
   */
  public function prepareRow(Row $row) {
    // Grab our nid and grab the Group ID from the D7 OG tables.
    $uid = $row->getSourceProperty('uid');

    // Grab data from both tables.
    $query = $this->select('og_membership', 'og')
      ->fields('og', ['gid'])
      ->condition('etid', $uid)
      ->condition('entity_type', 'user')
      ->execute()
      ->fetchAll();

    $query2 = $this->select('og_users_roles', 'our')
      ->fields('our', ['gid'])
      ->condition('uid', $uid)
      ->execute()
      ->fetchAll();

    // Set our array of values.
    $gids = [];
    foreach ($query as $gid) {
      $gids[] = $gid['gid'];
    }

    foreach ($query2 as $gid) {
      $gids[] = $gid['gid'];
    }

    // Set the property to use for the user yaml ER field.
    $row->setSourceProperty('gids', $gids);

    // Set the property to use in the custom_user destination.
    $row->setDestinationProperty('gids', $gids);

    return parent::prepareRow($row);
  }
}
```

So the magic here is that I am doing what I can do in ```hook_migrate_prepare_row``` but via the OO approach.  The reason I am doing it this way is due to the fact I can utilize the inherited injected database functionality.  We then will set the yaml source plugin to ```d7_group_user``` instead of the usual ```d7_user```.  This will tell it to use this source plugin instead.

You can also see that I am setting two properties for the source and destination.  It is probably overkill, but I like my code tiddy and readable.  For the task of migrating the users as is and adding them to their groups, we will focus on the destination property for now.

__Side note, you can migrate the user roles as is or perform tweaks to it.  I am not covering that in this post as it is really tertiary to the task at hand.__

So now that is set, we need to overcome our second obstacle, which is adding users to the group post save.  We can't add the users to a Group before the are saved because they don't exist yet.  There are no post hook actions in Drupal 8 yet, so we had to do some magic to handle this.  We need to extend the ```entity:user``` destination plugin and tweak it to our needs.  This proved to be a little challenging and took a few tries to get the code to function properly.  Here is the destination plugin I ended up with:

```php
namespace Drupal\YOUR_MODULE\Plugin\migrate\destination;

use Drupal\migrate\Row;
use Drupal\group\Entity\Group;
use Drupal\user\Plugin\migrate\destination\EntityUser;
use Drupal\Core\Entity\ContentEntityInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\migrate\Plugin\MigrationInterface;

/**
 * @MigrateDestination(
 *   id = "custom_user"
 * )
 */
class EntityUserPostSave extends EntityUser {

  /**
   * The og group ids array we passed through.
   *
   * @var array
   */
  private $gids;


  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition, MigrationInterface $migration = NULL) {
    // Basically we need to "trick" the plugin_id to use the right entity type.
    $entity_type = static::getEntityTypeId($plugin_id);
    return new static(
      $configuration,
      'entity:user',
      $plugin_definition,
      $migration,
      $container->get('entity.manager')->getStorage($entity_type),
      array_keys($container->get('entity.manager')->getBundleInfo($entity_type)),
      $container->get('entity.manager'),
      $container->get('plugin.manager.field.field_type'),
      $container->get('password')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function import(Row $row, array $old_destination_id_values = []) {
    // Set this so we can process in the save method.
    $this->gids = $row->getDestinationProperty('gids');
    return parent::import($row, $old_destination_id_values);
  }

  /**
   * {@inheritdoc}
   */
  protected function save(ContentEntityInterface $entity, array $old_destination_id_values = []) {
    // We need to pull the parts of the parents into this class.
    // If we don't, we get a failed migration.

    // From EntityUser::save()
    // Do not overwrite the root account password.
    if ($entity->id() != 1) {
      // Set the pre_hashed password so that the PasswordItem field does not hash
      // already hashed passwords. If the md5_passwords configuration option is
      // set we need to rehash the password and prefix with a U.
      // @see \Drupal\Core\Field\Plugin\Field\FieldType\PasswordItem::preSave()
      $entity->pass->pre_hashed = TRUE;
      if (isset($this->configuration['md5_passwords'])) {
        $entity->pass->value = 'U' . $this->password->hash($entity->pass->value);
      }
    }

    // Save the entity as in EntityContentBase::save().
    $entity->save();


    // Let's go through Each Group and add users.
    foreach ($this->gids as $gid) {
      if ($gid !== NULL) {
        $group = Group::load($gid);
        if ($group !== NULL) {
          $group->addMember($entity);
        }
      }
    }

    // return the entity ids as in EntityContentBase::save().
    return [$entity->id()];
  }
}
```

Let's break down what I had to do to get this to work.  First, I had to extend the create plugin and hard code the ```$plugin_id``` as ```entity:user```.  If I didn't do this, it would fail and say that the ```custom_user``` plugin did not exist.  Which makes sense since I am defining that in the Annotation potion of the code.  We technically wanted to extend the user plugin, not create a new one.  So this tweak fixed that issue.

The next issue was getting out destination variables we set in the source plugin into this class.  The way to handle this is through the import method as you can see.  We are setting a private property so that we can use it in the next step.

The final issue was getting the entity to save then mapping it against the user's respective groups.  To do this, I had to extend the save method and slap in the code from its parents.  My class had two parents: EntityUser and EntityContentBase.  When I tried to just add the user to the group without doing this, it would fail.  Why would it do this?  Because the user was still being saved post fact of this class.  Also, just called the parent function before my group saving code didn't work either.  So, the solution was to grab the parts from the parents, call it in order in my code.  This solved the issues.

You can see from the code above, I am also using the static method ```Group::load()```.  This is where the Groups module is greate because it allows me to do simple calls like this to handle my functionality.  the code is pretty straight foeard, but lets go over it realy quick.  The gids are the Organic Group nids form the Drupal 7 that are now the Drupal 8 Group ids.  We are cycling thought each one and adding it to the Group via the ```addMember``` method that the loaded Group class provides us with.  Pretty simple and easy to do and this gets our users into their respective groups on migration.

### Migrating the Organic Group User Entity Reference Field.

