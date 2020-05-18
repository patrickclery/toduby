# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Todo.create({ description: "Pickup laundry" })
Todo.create({ description: "Brush teeth", completed_at: "2020-01-04" })
Todo.create({ description: "Feed cat" })