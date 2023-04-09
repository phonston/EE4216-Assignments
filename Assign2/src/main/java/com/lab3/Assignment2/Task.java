package com.lab3.Assignment2;

public class Task {
    int id;
    String name;
    boolean completed;
    int timer;

    public Task() {
        this.id = 0;
        this.timer = 0;
        this.name = "";
        this.completed = false;
    }

    public Task(String name) {
        this.id = 0;
        this.timer = 0;
        this.name = "";
        this.completed = false;
    }

    public Task(int id, String name) {
        this.id = id;
        this.timer = 0;
        this.name = name;
        this.completed = false;
    }

    public Task(int id, String name, boolean completed) {
        this.id = id;
        this.timer = 0;
        this.name = name;
        this.completed = completed;
    }

    // incase we want to set the timer
    public Task(int id, String name, boolean completed, int timer) {
        this.id = id;
        this.name = name;
        this.completed = completed;
        this.timer = timer;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean getCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public void toggleCompleted() {
        this.completed = !completed;
    }

    public Integer getTimer() {
        return timer;
    }

    public void setTimer(int timer) {
        this.timer = timer;
    }

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id + ",\"" +
                "name='" + name + '\'' +
                ", completed=" + completed +
                ", timer=" + timer +
                '}';
    }
}
