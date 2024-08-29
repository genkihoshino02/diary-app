class DiariesController < ApplicationController
  before_action :authenticate_user!
  def index
    diaries = Diary.where(user_id: current_user.id)
    render json: {status: 200, data: diaries, message: "success"}
  end

  def show 
    diary = Diary.find(params[:id])

    render json: {status: 200, data: diary, message: "success"}
  end

  def create
    diary = current_user.diaries.build(diary_params)
    if diary.save
      render json: {status: 200, message: "success"}
    else
      render json: {status: :unprocessable_entity, message: diary.errors}
    end
  end

  def destroy
    diary = Diary.find(params[:id])
    if diary.destroy!
      render json: {status:200, message: "success"}
    else 
      render json: {status: :unprocessable_entity, message: diary.erros}
    end
  end

  def update
    diary = Diary.find(params[:id])

    if diary.update(diary_params)
      render json: {status: 200, message: "success"}
    else
      render json: {status: :unprocessable_entity, message: diary.errors}
    end
  end

  private
    def diary_params
      params.permit(:title, :content, :date).merge(user: current_user)
    end
end
