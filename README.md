# grunt-amp-optimizer

> A Grunt Plugin to optimize AMP HTML ⚡ at build-time.

This is a wrapper grunt plugin around [AMP Optimizer](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer).

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-amp-optimizer --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-amp-optimizer');
```

## The "amp_optimizer" task

### Overview
In your project's Gruntfile, add a section named `amp_optimizer` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  amp_optimizer: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

Options are passed to [AMP Optimizer](https://github.com/ampproject/amp-toolbox/tree/main/packages/optimizer). For the complete list of options, please consult [AMP Optimizer](https://www.npmjs.com/package/@ampproject/toolbox-optimizer).

### Usage Examples

#### Per project options
In this example, we pass `canonical` url to an incomplete document, the plugin would insert the missing tags. Also, the minification is disabled.

```js
grunt.initConfig({
  amp_optimizer: {
    options: {
      minify: false,
      canonical: 'https://exmaple.com'
    },
    files: {
      'dest/index.html': 'src/index.html',
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

 *  2020-12-12   v0.1.0   Initial version based on `grunt-init gruntplugin`

---

Task submitted by [Saw-mon and Natalie](https://www.sawmon-and-natalie.com/)
