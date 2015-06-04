Rails.application.routes.draw do
  get '/' => 'elements#index'
  get '/properties' => 'elements#property'
end
