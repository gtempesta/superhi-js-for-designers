module.exports = {
  purge: ["./public/**/*.html"],
  theme: {
    colors: {
      'light-blue': '#c7f2f1',
      'dark-blue': '#052837',
      'white': '#fff'
    },
    inset: {
      '0': 0,
      auto: 'auto',
      'iris-top': '23px',
      'first-iris-left': '11px',
      'second-iris-left': '49px',
    },
    fontFamily: {
      body: ['Rubik', 'Arial'],
    },
    borderRadius: {
      'button': '50px',
      'iris': '6px'
    },
    extend: {
        backgroundImage: theme => ({
          'hero': "url('../hero.jpg')",
        }),
        spacing: {
          'iris-size': '6px'
        }
    },
  }
};
