class CardsController < ApplicationController
  def index
  	@cards = @list.cards
  end

  def create
  	@card = Card.create(card_params)
  end

  
end
