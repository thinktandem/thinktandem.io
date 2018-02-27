---
layout: layouts/article.html
title: "Migrating to a Drupal 8 Date Range"
tags: development, drupal
permalink: true
seo:
  description: byline
  keywords: tags
author: John Ouellet
private: false
mainImage: images/articles/migrate-dates.jpg
img-src: images/articles/migrate-dates.jpg
byline: Migrating a date range to Drupal 8 is a lot easier now than it was a year ago.  Below I will show you how to transform the data to get the date ranges to migrate to Drupal 8 properly.
date: 2018-02-27
---

The Situation before us
---------------------

Right now we are using the [Migrate Source CSV](https://www.drupal.org/project/migrate_source_csv) module to handle the migration.  In the CSV that we used, dates were exported form the old site as Unix timestamps.  Which worked great for single date migration in Drupal 8.  Our date ranges though were showing up like this in the CSV:

```bash
1285905600 to 1317355200
```
So this would cause the migration to implode when we tried to move the date ranges over.  We needed to transform the data before it went through the process mechanisms during the migration.  Once we figured it out, it was quite easy to do this.  Out solution is for how our data is coming across during the migration.  However, you can apply the same principle to your data in whatever format your data is in.

The transformation
-------------------

### Setting up the data.

So we are going to transform this data first.  We can easily do this via ```hook_migrate_prepare_row()```.  Here is how we set this up for later use in our ```process``` plugin.

```php
use Drupal\migrate\Plugin\MigrationInterface;
use Drupal\migrate\Plugin\MigrateSourceInterface;
use Drupal\migrate\Row;

/**
 * Implements hook_migrate_prepare_row().
 */
function YOUR_MODULE_migrate_prepare_row(Row $row, MigrateSourceInterface $source, MigrationInterface $migration) {
  switch ($migration->id()) {
    case 'YOUR_MIGRATION_ID':
      // Use your source id from the range you are trying to migrate form the yml.
      // i.e:
      // source:
      //   column_names:
      //     0:
      //       date_ranges: 'The date range'
      if ($values = $row->getSourceProperty('date_ranges')) {
        $value = explode(' to ', $values);
        $row->setSourceProperty('Date Start', $value[0]);
        $row->setSourceProperty('Date End', $value[1]);
      }

      break;
  }
}
```

### Processing the data.

Now that we have the date fields split out, we can then use the magic in the ```process``` plugin key on our migration yaml.

```yaml
process:
  field_date_ranges/value:
    plugin: format_date
    from_format: U
    to_format: Y-m-d
    source: 'Date Start'
  field_date_ranges/end_value:
    plugin: format_date
    from_format: U
    to_format: Y-m-d
    source: 'Date End'
```

Very straight forward and easy to do.  We are using the format_date plugin to transform the Unix timestamp that we split up into the date only range on the Drupal 8 side.


Conclusion
----------

The Drupal 8 migration API is very customizable.  Once you start handling more advanced tasks, you can migrate just about anything.  Remeber to always search the core code base for examples and you can easily whip up a solution like I did above.
