# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150702125449) do

  create_table "compounds", force: :cascade do |t|
    t.string   "symbol"
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "compounds_elements", id: false, force: :cascade do |t|
    t.integer "compound_id"
    t.integer "element_id"
  end

  add_index "compounds_elements", ["compound_id"], name: "index_compounds_elements_on_compound_id"
  add_index "compounds_elements", ["element_id"], name: "index_compounds_elements_on_element_id"

  create_table "elements", force: :cascade do |t|
    t.string   "short_name"
    t.string   "long_name"
    t.float    "mass"
    t.integer  "period"
    t.integer  "group"
    t.float    "boiling_point"
    t.float    "melting_point"
    t.float    "ionization_energy"
    t.float    "electronegativity"
    t.float    "electron_affinity"
    t.float    "abundance"
    t.float    "radium"
    t.string   "electron_configuration"
    t.integer  "atomic_number"
    t.string   "category"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "elements_valencies", id: false, force: :cascade do |t|
    t.integer "element_id"
    t.integer "valency_id"
  end

  add_index "elements_valencies", ["element_id"], name: "index_elements_valencies_on_element_id"
  add_index "elements_valencies", ["valency_id"], name: "index_elements_valencies_on_valency_id"

  create_table "scores", force: :cascade do |t|
    t.integer  "puntuation", default: 0
    t.integer  "mins"
    t.integer  "secs"
    t.string   "mode"
    t.integer  "id_user"
    t.string   "levelgame"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "nick"
    t.string   "email"
    t.string   "password_digest"
    t.float    "level",           default: 0.0
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.string   "image"
  end

  create_table "valencies", force: :cascade do |t|
    t.integer  "valence"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
