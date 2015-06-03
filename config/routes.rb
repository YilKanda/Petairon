Rails.application.routes.draw do
  get '/' => 'elements#index'
  get '/elements/' => 'elements#index'
end
