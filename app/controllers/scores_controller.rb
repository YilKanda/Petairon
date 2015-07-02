class ScoresController < ApplicationController
	def index
		@scores = Score.all
		@scores_timer_easy = Score.where(mode: 'Timer mode').where(levelgame: 'easy');
		@scores_timer_medium = Score.where(mode: 'Timer mode').where(levelgame: 'medium');
		@scores_timer_hard = Score.where(mode: 'Timer mode').where(levelgame: 'hard');
		@scores_timer_expert = Score.where(mode: 'Timer mode').where(levelgame: 'expert');
		@scores_normal_easy = Score.where(mode: 'Normal mode').where(levelgame: 'easy');
		@scores_normal_medium = Score.where(mode: 'Normal mode').where(levelgame: 'medium');
		@scores_normal_hard = Score.where(mode: 'Normal mode').where(levelgame: 'hard');
		@scores_normal_expert = Score.where(mode: 'Normal mode').where(levelgame: 'expert');

	end

	def create
    success = false
    puntuation = params[:puntuation]
    time = params[:time]
    mode = params[:mode]
    levelgame = params[:levelgame]
    id_user = current_user.id

    new_score = Score.new id_user: id_user, puntuation: puntuation, time: time, mode: mode, levelgame: levelgame

    if new_score.save
      success = true
    end

    render json: 1
    
  end
end
