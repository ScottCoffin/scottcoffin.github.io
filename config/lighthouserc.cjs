module.exports = {
  ci: {
    collect: {
      staticDistDir: './_site',
      url: [
        'http://localhost:4000/',
        'http://localhost:4000/Research/',
        'http://localhost:4000/Data_Science/',
        'http://localhost:4000/Media/',
        'http://localhost:4000/For_Journalists/',
        'http://localhost:4000/Microplastics_Explainer/'
      ],
      numberOfRuns: 3,
      settings: {
        formFactor: 'mobile',
        screenEmulation: {
          mobile: true,
          width: 390,
          height: 844,
          deviceScaleFactor: 3,
          disabled: false
        },
        throttlingMethod: 'simulate'
      }
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.70 }],
        'categories:accessibility': ['error', { minScore: 0.90 }],
        'categories:best-practices': ['warn', { minScore: 0.90 }],
        'categories:seo': ['error', { minScore: 0.90 }]
      }
    },
    upload: {
      target: 'filesystem',
      outputDir: './reports/lhci'
    }
  }
};
