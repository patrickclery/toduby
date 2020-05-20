# frozen_string_literal: true

module Api
  module V1
    class TodosController < ApplicationController
      before_action :set_todo, only: [:show, :update, :destroy]

      # GET /todos
      def index
        @todos = Todo.all.order("LOWER(description)")

        render json: TodoSerializer.new(@todos)
      end

      # GET /todos/1
      def show
        render json: @todo
      end

      # POST /todos
      def create
        @todo = Todo.new(todo_params)

        if @todo.save
          render json: TodoSerializer.new(@todo), status: :created
        else
          raise "Invalid Todo"
        end
      end

      # PATCH/PUT /todos/1
      def update
        if @todo.update(todo_params)
          render json: TodoSerializer.new(@todo)
        else
          render json: TodoSerializer.new(@todo), status: :unprocessable_entity
        end
      end

      # DELETE /todos/1
      def destroy
        @todo.destroy
      end

      private

      # Use callbacks to share common setup or constraints between actions.
      def set_todo
        @todo = Todo.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def todo_params
        params.permit(:description, :completed, :priority)
      end
    end
  end
end
