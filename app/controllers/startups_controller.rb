class StartupsController < ApplicationController

	before_action :authenticate_user!, :except => [:show, :index]
	before_action :set_startup, only: [:show, :edit, :update, :destroy]

	def index
    @startups = Startup.all
  end

  def show
  end

  def new
    @startup = Startup.new
  end

  def edit
  end

  def create
    @startup = Startup.new(startup_params)

    respond_to do |format|
      if @startup.save
        format.html { redirect_to @startup, notice: 'Startup was successfully created.' }
      else
        format.html { render :new }
      end
    end
  end

  def update
    respond_to do |format|
      if @startup.update(startup_params)
        format.html { redirect_to @startup, notice: 'Startup was successfully updated.' }
      else
        format.html { render :edit }
      end
    end
  end

	def destroy
    @startup.destroy
    respond_to do |format|
      format.html { redirect_to startups_url, notice: 'Startup was successfully destroyed.' }
    end
  end

  private
    def set_startup
      @startup = Startup.find(params[:id])
    end

    def startup_params
      params.require(:startup).permit(:name, :description, :website, :video, :image)
    end
end
