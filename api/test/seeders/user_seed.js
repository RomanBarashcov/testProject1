const seed = (models) => {

    return models.User.create({
        name: 'Super Admin',
        email: 'superadmin@mail.com',
        password: "123456",
        Role: {
          type: 'player'
        },
        State: {
          type: 'approve'
        }
      }, {
        include: [models.Role, models.State] // super cool shortcut to make related rows in one step
      })
    .catch(e => console.log(e))
};

module.exports = seed;