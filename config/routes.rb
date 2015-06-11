Rails.application.routes.draw do
  get '/' => 'elements#index'
  get '/properties' => 'elements#property'
  get '/valencies' => 'elements#element_valencies'
end
