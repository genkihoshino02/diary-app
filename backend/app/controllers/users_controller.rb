class UsersController < ApplicationController
  def index 
    render json: {status: 200, data: User.all}
  end
end
