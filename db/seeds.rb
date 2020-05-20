# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.first || User.create(email: "test@test.com", password: "password", password_confirmation: "password")

Todo.create({ user: user, priority: 0, description: "Pickup laundry" })
Todo.create({ user: user, priority: 0, description: "Brush teeth", completed_at: DateTime.new(2020, 1, 4) })
Todo.create({ user: user, priority: 1, description: "Feed cat" })