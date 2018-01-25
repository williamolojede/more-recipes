const { recipe } = require('./mockData');

module.exports = {
  'Render landing page': (browser) => {
    browser
      .url('http://localhost:8000')
      .waitForElementVisible('body', 5000)
      .assert.urlEquals('http://localhost:8000/login')
      .assert.title('More Recipes')
      .assert.visible('.login-card')
      .assert.containsText('a.brand-logo', 'MoreRecipes')
      .assert.containsText('button.form__submit', 'Login')
      .assert.visible('.page-footer')
      .assert.containsText('a[href="/signup"]', 'Signup now')
      .assert.containsText('.page-footer a[href="http://william.ng/"]', 'William I. Olojede')
      .assert.visible('.auth-form.form')
      .pause(500);
  },
  'user navigates to signup page from login page and back to login page': (browser) => {
    browser
      .url('http://localhost:8000')
      .waitForElementVisible('body', 5000)
      .click('a[href="/signup"]')
      .assert.urlEquals('http://localhost:8000/signup')
      .click('a[href="/login"]')
      .assert.urlEquals('http://localhost:8000/login')
      .pause(500);
  },
  'user submits signup form with passord length less than 6 characters': (browser) => {
    browser
      .url('http://localhost:8000/signup')
      .assert.containsText('button.form__submit', 'Register')
      .setValue('input[name="usr-name"]', 'Johnson Benjamin')
      .setValue('input[name="usr-email"]', 'johnben@mailer.com')
      .setValue('input[name="usr-pswd"]', '12345')
      .click('button.form__submit')
      .waitForElementVisible('.error', 5000)
      .assert.containsText('.error .error__message', 'Password must be minimum of 6 characters')
      .pause(500);
  },
  'user signups then logs out': (browser) => {
    browser
      .url('http://localhost:8000/signup')
      .assert.containsText('button.form__submit', 'Register')
      .setValue('input[name="usr-name"]', 'Johnson Benjamin')
      .setValue('input[name="usr-email"]', 'johnben@mailer.com')
      .setValue('input[name="usr-pswd"]', '1234567890')
      .click('button.form__submit')
      .waitForElementVisible('button.dropdown', 5000)
      .assert.urlEquals('http://localhost:8000/')
      .click('button.dropdown')
      .assert.containsText('li.dropdown-header p', 'Johnson Benjamin')
      .click('a.logout__button')
      .assert.urlEquals('http://localhost:8000/login')
      .pause(500);
  },
  'user can not signup with taken email address': (browser) => {
    browser
      .url('http://localhost:8000/signup')
      .assert.containsText('button.form__submit', 'Register')
      .setValue('input[name="usr-name"]', 'Johnson  Benjamin')
      .setValue('input[name="usr-email"]', 'johnben@mailer.com')
      .setValue('input[name="usr-pswd"]', '1234567890')
      .click('button.form__submit')
      .waitForElementVisible('.error', 5000)
      .assert.containsText('.error .error__message', 'User with email already exist')
      .pause(500);
  },
  'user can not signup with invalid email address': (browser) => {
    browser
      .url('http://localhost:8000/signup')
      .assert.containsText('button.form__submit', 'Register')
      .setValue('input[name="usr-name"]', 'Johnson  Benjamin')
      .setValue('input[name="usr-email"]', 'johnben@mailer')
      .setValue('input[name="usr-pswd"]', '1234567890')
      .click('button.form__submit')
      .waitForElementVisible('.error', 5000)
      .assert.containsText('.error .error__message', 'enter a valid email address')
      .pause(500);
  },
  'user can not login with invalid email address': (browser) => {
    browser
      .url('http://localhost:8000/login')
      .assert.containsText('button.form__submit', 'Login')
      .setValue('input[name="usr-email"]', 'johnben@mailer')
      .setValue('input[name="usr-pswd"]', '1234567890')
      .click('button.form__submit')
      .waitForElementVisible('.error', 5000)
      .assert.containsText('.error .error__message', 'Wrong email or password')
      .pause(500);
  },
  'user can not login with invalid password': (browser) => {
    browser
      .url('http://localhost:8000/login')
      .assert.containsText('button.form__submit', 'Login')
      .setValue('input[name="usr-email"]', 'johnben@mailer.com')
      .setValue('input[name="usr-pswd"]', '1234567')
      .click('button.form__submit')
      .waitForElementVisible('.error', 5000)
      .assert.containsText('.error .error__message', 'Wrong email or password')
      .pause(500);
  },
  'user can login': (browser) => {
    browser
      .url('http://localhost:8000/login')
      .assert.containsText('button.form__submit', 'Login')
      .setValue('input[name="usr-email"]', 'johnben@mailer.com')
      .setValue('input[name="usr-pswd"]', '1234567890')
      .click('button.form__submit')
      .waitForElementVisible('button.dropdown', 5000)
      .assert.urlEquals('http://localhost:8000/')
      .pause(500);
  },
  'logged in user gets redirected back to home page if he/she goes to login page': (browser) => {
    browser
      .url('http://localhost:8000/login')
      .assert.urlEquals('http://localhost:8000/')
      .pause(500);
  },
  'User can view and edit profile': (browser) => {
    browser
      .url('http://localhost:8000')
      .waitForElementVisible('button.dropdown', 5000)
      .click('button.dropdown')
      .assert.containsText('a[href="/user"]', 'Your Profile')
      .click('a[href="/user"]')
      .assert.urlEquals('http://localhost:8000/user')
      .waitForElementVisible('.image-upload__preview___image', 5000);
    browser.expect.element('img.image-upload__preview___image')
      .to.have.attribute('src', 'https://catholic-foundation.org/wp-content/uploads/2017/07/unisex-avatar.png');
    browser.expect.element('input#fullname')
      .to.have.value.that.equals('Johnson Benjamin');
    browser.expect.element('input#email')
      .to.have.value.that.equals('johnben@mailer.com');
    browser
      .clearValue('#fullname')
      .setValue('input#fullname', 'Janet Benjamin')
      .click('button.submit-btn')
      .waitForElementVisible('.notification', 5000)
      .assert.containsText('.notification', 'User Details updated successfully');
    browser.expect.element('input#fullname')
      .to.have.value.that.equals('Janet Benjamin');
    // .setValue('input[name="usr-pswd"]', '1234567890');
    // browser.setValue('input[type="file"]',
    //   path.resolve('../../../Desktop/andela-31/William Olojede-X3.jpg'));
    browser.pause(2000);
  },
  'User can add recipe': (browser) => {
    browser
      .url('http://localhost:8000')
      .waitForElementVisible('button.dropdown', 5000)
      .click('button.dropdown')
      .assert.containsText('a[href="/user/recipes/create"]', 'Create New Recipe')
      .click('a[href="/user/recipes/create"]')
      .assert.urlEquals('http://localhost:8000/user/recipes/create')
      .setValue('input#recipe-name', recipe.name)
      .setValue('textarea#recipe-description', recipe.description);

    browser.click('.add-new__instruction');
    recipe.instructions.forEach((instruction) => {
      browser.setValue('textarea[name="recipe-instruction__name"]', [instruction, browser.Keys.ENTER]);
    });
    browser.click('.add-new__ingredient');
    recipe.ingredients.forEach((ingredient) => {
      browser.setValue('textarea[name="recipe-ingredient__name"]', [ingredient, browser.Keys.ENTER]);
    });
    browser
      .click('.submit-btn')
      .waitForElementVisible('.notification', 5000)
      .assert.containsText('.notification', 'recipe created successfully')
      .pause(5000)
      .assert.urlEquals('http://localhost:8000/user/recipes')
      .pause(500);
  },
  'User cannot add recipe if name is same as an existing recipe': (browser) => {
    browser
      .url('http://localhost:8000')
      .waitForElementVisible('button.dropdown', 5000)
      .click('button.dropdown')
      .assert.containsText('a[href="/user/recipes/create"]', 'Create New Recipe')
      .click('a[href="/user/recipes/create"]')
      .assert.urlEquals('http://localhost:8000/user/recipes/create')
      .setValue('input#recipe-name', recipe.name)
      .setValue('textarea#recipe-description', recipe.description);

    browser.click('.add-new__instruction');
    recipe.instructions.forEach((instruction) => {
      browser.setValue('textarea[name="recipe-instruction__name"]', [instruction, browser.Keys.ENTER]);
    });
    browser.click('.add-new__ingredient');
    recipe.ingredients.forEach((ingredient) => {
      browser.setValue('textarea[name="recipe-ingredient__name"]', [ingredient, browser.Keys.ENTER]);
    });
    browser
      .click('.submit-btn')
      .waitForElementVisible('.notification', 5000)
      .assert.containsText('.notification', 'You already created a recipe with this name!')
      .pause(5000)
      .assert.urlEquals('http://localhost:8000/user/recipes/create')
      .pause(500);
  },
  'User can not add recipe if required recipe name or description are empty': (browser) => {
    browser
      .url('http://localhost:8000')
      .waitForElementVisible('button.dropdown', 5000)
      .click('button.dropdown')
      .assert.containsText('a[href="/user/recipes/create"]', 'Create New Recipe')
      .click('a[href="/user/recipes/create"]')
      .assert.urlEquals('http://localhost:8000/user/recipes/create')
      .click('.submit-btn')
      .assert.containsText('.error .error__message', 'recipe name and description are required')
      .pause(500);
  },
  'User can not add recipe if instructions or ingredients field are not provided': (browser) => {
    browser
      .url('http://localhost:8000')
      .waitForElementVisible('button.dropdown', 5000)
      .click('button.dropdown')
      .assert.containsText('a[href="/user/recipes/create"]', 'Create New Recipe')
      .click('a[href="/user/recipes/create"]')
      .assert.urlEquals('http://localhost:8000/user/recipes/create')
      .setValue('input#recipe-name', recipe.name)
      .setValue('textarea#recipe-description', recipe.description)
      .click('.submit-btn')
      .assert.containsText('.error .error__message', 'ingredients and instructions cannot be empty')
      .pause(500);
  },
  'Users can view recipe': (browser) => {
    browser
      .url('http://localhost:8000')
      .assert.containsText('.recipe-card__title', recipe.name)
      .click('a[href="/recipe/1"]')
      .waitForElementVisible('.page__recipe', 5000)
      .assert.containsText('.recipe__name', recipe.name)
      .assert.containsText('.recipe__description', recipe.description)
      .assert.containsText('.recipe-stats__views span', '1')
      .assert.urlEquals('http://localhost:8000/recipe/1')
      .pause(500);
  },
  'Users can upvote or down vote a recipe': (browser) => {
    browser
      .url('http://localhost:8000/recipe/1')
      .waitForElementVisible('.recipe__name', 5000)
      .click('.recipe-stats__vote-up button')
      .waitForElementVisible('.notification', 5000)
      .assert.containsText('.notification', 'You liked this recipe')
      .assert.containsText('.recipe-stats__vote-up span', '1')
      .assert.containsText('.recipe-stats__vote-down span', '0')
      .pause(3000)
      .click('.recipe-stats__vote-down button')
      .waitForElementVisible('.notification', 5000)
      .assert.containsText('.notification', 'You disliked this recipe')
      .assert.containsText('.recipe-stats__vote-up span', '0')
      .assert.containsText('.recipe-stats__vote-down span', '1')
      .pause(500);
  },
  'Users can not favorite his/her own recipe': (browser) => {
    browser
      .url('http://localhost:8000/recipe/1')
      .waitForElementVisible('.recipe__name', 5000)
      .click('.recipe-stats__favorite button')
      .waitForElementVisible('.notification', 5000)
      .assert.containsText('.notification', 'You are not allowed to favorite your own recipe!')
      .pause(500);
  },
  'Users add review for arecipe': (browser) => {
    browser
      .url('http://localhost:8000/recipe/1')
      .waitForElementVisible('.recipe__name', 5000)
      .setValue('.review__card-edit__form textarea', 'cant believed you came up with this idea before me')
      .click('.review__card-edit__form button.btn ')
      .pause(500)
      .assert.containsText('.review__card-card-content:first-of-type', 'cant believed you came up with this idea before me')
      .pause(500);
  },
  'User can modify his/her own recipe': (browser) => {
    browser
      .url('http://localhost:8000/user/recipes')
      .click('.recipes-list-item__actions-edit')
      .pause(1000)
      .assert.urlEquals('http://localhost:8000/user/recipes/1/edit')
      .assert.containsText('.submit-btn span', 'Update')
      .clearValue('input#recipe-name')
      .setValue('input#recipe-name', 'new recipe name')
      .click('.submit-btn')
      .waitForElementVisible('.notification', 5000)
      .assert.containsText('.notification', 'Recipe updated successfully')
      .pause(5000)
      .assert.urlEquals('http://localhost:8000/user/recipes')
      .pause(500);
  },
  'User can delete his/her own recipe': (browser) => {
    browser
      .url('http://localhost:8000/user/recipes')
      .assert.elementPresent('a[href="/recipe/1"]')
      .click('.recipes-list-item__actions-delete')
      .waitForElementVisible('.swal-modal', 5000)
      .assert.containsText('.swal-text', 'Once deleted, you will not be able to recover this recipe!')
      .click('.swal-button.swal-button--confirm.swal-button--danger')
      .waitForElementVisible('.notification', 5000)
      .assert.containsText('.notification', 'Recipe deleted successfully')
      .assert.elementNotPresent('a[href="/recipe/1"]')
      .pause(500);
  }
};
