class UsersController < ApplicationController
  def index
    @users = User.all
  end

  def show
		@user = User.find params[:id]
  end

  def new
    @user = User.new    
  end

  def create
    @user = User.new user_params
    @image_size = File.size(params[:user][:image].tempfile)
    if @image_size < 150000
      if @user.save
        flash[:notice] = "User created successfully"
        redirect_to login_path
      else
        flash[:error] = @user.errors.full_messages
        redirect_to new_user_path
      end
    else
      flash[:alert] = 'Image size is too big!'
      redirect_to new_user_path
    end
  end

  def edit
    @user = User.find params[:id]
  end

  def update
    @user = User.find params[:id]
    @image_size = File.size(params[:user][:image].tempfile)
    if @image_size < 150000
      if @user.update user_params
        flash[:notice] = "User updated successfully!"
        redirect_to user_path(@user)
      else
        flash[:error] = @user.errors.full_messages
        redirect_to edit_user_path(@user)
      end
    else
      flash[:alert] = 'Image size is too big!'
      redirect_to edit_user_path(@user)
    end
  end

  def destroy
    session[:user_id] = nil 
    @user = User.find(params[:id])
    @user.destroy

    redirect_to root_path
  end

  private

  def user_params
      params.require(:user).permit(:name, :nick, :email, :password, :score, :level, :image)    
  end
end
