class ListsController < ApplicationController
	before_action :board_instance

  def index
  	render json: @board.lists
  end

  def create
  	@list = @board.lists.new(list_params)
  	if @list.save
  		render json: @list
  	else
  		render json: {errors: @list.erros.full_messages}
  	end
  end

  def destroy
  	@board.lists.find(params[:id]).destroy
  	render json: {message: 'list deleted'}
  end

  private

  def board_instance
  	@board = Board.find(params[:board_id])
  end

  def list_params
  	params.require(:list).permit(:name, :priority)
  end
end
