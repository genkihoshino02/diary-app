class DiariesController < ApplicationController
  def index
    render json: {status: 200, data: Diary.all, message: "success"}
  end

  def show 
    diary = Diary.find(params[:id])

    render json: {status: 200, data: diary, message: "success"}
  end

  def create
    diary = Diary.new(diary_params)
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
      params.require(:diary).permit(:title, :content, :date)
    end
end
