# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

5.times do |i|
  User.create!(
    email: "test#{i + 1}@test.com",
    username: "test#{i + 1}"
  )
  Diary.create!(
    title: "test#{i + 1}",
    content: "test#{i + 1}"
  )
end
