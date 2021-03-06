class UsersController < ApplicationController
  def index
    @users = User.all
  end

  def show
		@user = User.find params[:id]
    @scores = Score.where(id_user: @user.id);
    @score_timer = Score.where(mode: 'Timer mode').where(id_user: @user.id);
    @score_timer_easy = Score.where(mode: 'Timer mode').where(levelgame: 'easy').where(id_user: @user.id).order('puntuation DESC, mins, secs').limit(10);
    @score_timer_medium = Score.where(mode: 'Timer mode').where(levelgame: 'medium').where(id_user: @user.id).order('puntuation DESC, mins, secs').limit(10);
    @score_timer_hard = Score.where(mode: 'Timer mode').where(levelgame: 'hard').where(id_user: @user.id).order('puntuation DESC, mins, secs').limit(10);
    @score_timer_expert = Score.where(mode: 'Timer mode').where(levelgame: 'expert').where(id_user: @user.id).order('puntuation DESC, mins, secs').limit(10);
    @score_normal = Score.where(mode: 'Normal mode').where(id_user: @user.id);
    @score_normal_easy = Score.where(mode: 'Normal mode').where(levelgame: 'easy').where(id_user: @user.id).order('puntuation DESC, mins, secs').limit(10);
    @score_normal_medium = Score.where(mode: 'Normal mode').where(levelgame: 'medium').where(id_user: @user.id).order('puntuation DESC, mins, secs').limit(10);
    @score_normal_hard = Score.where(mode: 'Normal mode').where(levelgame: 'hard').where(id_user: @user.id).order('puntuation DESC, mins, secs').limit(10);
    @score_normal_expert = Score.where(mode: 'Normal mode').where(levelgame: 'expert').where(id_user: @user.id).order('puntuation DESC, mins, secs').limit(10);
    
    respond_to do |format|
      format.html
      format.json { render json: @scores }
    end
  end

  def new
    @user = User.new    
  end

  def create
    @user = User.new user_params
    if params[:user][:image]
      @image_size = File.size(params[:user][:image].tempfile)
      if @image_size < 150000
        if @user.save
          flash[:notice] = "User created successfully. Log in!"
          redirect_to login_path
        else
          flash[:error] = @user.errors.full_messages
          redirect_to new_user_path
        end
      else
        flash[:alert] = 'Image size is too big!'
        redirect_to new_user_path
      end
    else
      if @user.save
        flash[:notice] = "User created successfully"
        redirect_to login_path
      else
        flash[:error] = @user.errors.full_messages
        redirect_to new_user_path
      end
    end
  end

  def edit
    @user = User.find params[:id]
  end

  def update
    @user = User.find params[:id]
    if params[:user][:image]
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
    else
      if @user.update user_params
        flash[:notice] = "User updated successfully!"
        redirect_to user_path(@user)
      else
        flash[:error] = @user.errors.full_messages
        redirect_to edit_user_path(@user)
      end
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
      params.require(:user).permit(:name, :nick, :email, :password, :level, :image)    
  end
end
