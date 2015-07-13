class ScoresController < ApplicationController
	def index
		@scores = Score.all
		@scores_timer_easy = Score.where(mode: 'Timer mode').where(levelgame: 'easy').order('puntuation DESC, mins, secs').limit(10);
		@scores_timer_medium = Score.where(mode: 'Timer mode').where(levelgame: 'medium').order('puntuation DESC, mins, secs').limit(10);
		@scores_timer_hard = Score.where(mode: 'Timer mode').where(levelgame: 'hard').order('puntuation DESC, mins, secs').limit(10);
		@scores_timer_expert = Score.where(mode: 'Timer mode').where(levelgame: 'expert').order('puntuation DESC, mins, secs').limit(10);
		@scores_normal_easy = Score.where(mode: 'Normal mode').where(levelgame: 'easy').order('puntuation DESC, mins, secs').limit(10);
		@scores_normal_medium = Score.where(mode: 'Normal mode').where(levelgame: 'medium').order('puntuation DESC, mins, secs').limit(10);
		@scores_normal_hard = Score.where(mode: 'Normal mode').where(levelgame: 'hard').order('puntuation DESC, mins, secs').limit(10);
		@scores_normal_expert = Score.where(mode: 'Normal mode').where(levelgame: 'expert').order('puntuation DESC, mins, secs').limit(10);
	end

	def create
    success = false
    puntuation = params[:puntuation]
    mins = params[:mins]
    secs = params[:secs]
    mode = params[:mode]
    levelgame = params[:levelgame]
    id_user = current_user.id

    new_score = Score.new id_user: id_user, puntuation: puntuation, mins: mins, secs: secs, mode: mode, levelgame: levelgame

    if new_score.save
      success = true
    end    
  end
end
