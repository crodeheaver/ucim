// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/56295f5058cac7ae458540423c50ac2dcf9fc711/karma-coverage/karma-coverage.d.ts
declare module 'karma-coverage' {
  import * as karma from 'karma';
  import * as istanbul from 'istanbul';

  namespace karmaCoverage {
    interface Karma extends karma.Karma {}

    interface Config extends karma.Config {
      set: (config: ConfigOptions) => void;
    }

    interface ConfigOptions extends karma.ConfigOptions {
      /**
       * See https://github.com/karma-runner/karma-coverage/blob/master/docs/configuration.md
       */
      coverageReporter?: (Reporter|Reporter[]);
    }

    interface Reporter {
      type?: string;
      dir?: string;
      subdir?: string | ((browser: string) => string);
      check?: any;
      watermarks?: any;
      includeAllSources?: boolean;
      sourceStore?: istanbul.Store;
      instrumenter?: any;
    }
  }

  var karmaCoverage: karmaCoverage.Karma;

  export = karmaCoverage;
}