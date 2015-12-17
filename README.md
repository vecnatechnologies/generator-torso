# generator-torso


[Yeoman](http://yeoman.io/ "yoeman's website") can scaffold out a new application using prebuilt generators. This generator sets up a project using [backbone-torso](https://github.com/vecnatechnologies/backbone-torso) (a [backbone](http://backbonejs.org)-based framework).

### Install yoeman
```
> npm install -g yo
```

### Install generator-torso
```
> npm install -g generator-torso
```

### Create a new project
```
> cd path/to/project
> yo torso <name of project>
```

The name of your project will be used as the name inside the generated package.json

In your current directory, the generator will produce the following files:

    ├─ .gitignore
    ├─ package.json
    ├─ gulpfile.js
    ├─ dist
    └─ app
        ├─ app.scss
        ├─ main.js
        ├─ router.js
        ├─ index.html
        └─ home
            ├─ homeView.js
            ├─ home-template.hbs
            └─ _home.scss

## Pod Generator

When creating an application, generating a new feature typically requires creating a view, template for that view, and sometimes special styling for that view as well. Pods are directories filled with these feature-specific files. Use the pod sub generator to rapidly create a pod pre-filled with a view, template, and scss file.

### Create a new pod
```
> cd path/to/project/app
> yo torso:pod foo
```

It will ask you if the view to be generated should be a singleton. You should answer yes if the view will only ever be instantiated once.

If you hit enter without answering or type "n" for no to the singleton question, it will generate the following files:

    └─ foo
       ├─ FooView.js
       ├─ foo-template.hbs
       └─ _foo.scss

If you answer 'y' for yes, it will instead produce the following files. The file containing the view is now lowercased to show that if you require this module, it will already be instantiated.

    └─ foo
       ├─ fooView.js
       ├─ foo-template.hbs
       └─ _foo.scss

Note: if an app.scss file exists (which it does by default), calling ```yo torso:pod foo``` will add: @import 'foo/foo'; to that file

## Credits
Originally developed by [Vecna Technologies, Inc.](http://www.vecna.com/) and open sourced as part of its community service program. See the LICENSE file for more details.
Vecna Technologies encourages employees to give 10% of their paid working time to community service projects.
To learn more about Vecna Technologies, its products and community service programs, please visit http://www.vecna.com.
