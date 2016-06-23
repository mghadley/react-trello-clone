Rails.application.routes.draw do

  get 'cards/index'

  root 'boards#index'

  resources :boards do
    resources :lists
  end

  resources :cards
end
