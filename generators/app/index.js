'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.

    const prompts = [
      {
        type: 'input',
        name: 'npmName',
        message: '输入 npm 包的名称...'
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    var pkg = this.fs.readJSON(this.templatePath('package.json'), {});
    pkg.name = this.props.npmName
    pkg.bin = `./bin/${this.props.npmName}.js`
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
    // mkdirp('public');
    this.fs.copyTpl(
      this.templatePath('bin/xl_git.js'),
      this.destinationPath(`bin/${this.props.npmName}.js`),
      { name: this.props.npmName }
    )
    this.fs.copy(
      this.templatePath('lib/tag.js'),
      this.destinationPath('lib/tag.js')
    );
  }

  install() {
    this.installDependencies();
  }
};
