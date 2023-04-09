package com.lab3.Assignment2;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TaskController {
    private TaskDao taskDao;

    public TaskController(TaskDao taskDao) {
        this.taskDao = taskDao;
    }

    @RequestMapping(value = "/api/tasks", method = RequestMethod.GET)
    public Task[] getAllTasks() {
        ArrayList<Task> tasks = taskDao.getAllTasks();

        // convert the arraylist to an array object
        Task[] taskArray = new Task[tasks.size()];
        taskArray = tasks.toArray(taskArray);

        return taskArray;
    }

    @RequestMapping(value = "/api/tasks/add", method = RequestMethod.POST)
    public String addTask(@RequestBody Task task) {
        String message = taskDao.addTask(task.getName());
        // String message = "nice";
        // return the message
        return message;
    }

    @RequestMapping(value = "/api/tasks/update/{id}", method = RequestMethod.PUT)
    public String updateTask(@RequestBody Task task, @PathVariable int id) {
        String message = taskDao.updateTask(task);
        // return the message
        return message;
    }

    @RequestMapping(value = "/api/tasks/delete/{id}", method = RequestMethod.DELETE)
    public String deleteTask(@PathVariable int id) {
        String message = taskDao.deleteTask(id);
        // return the message
        return message;
    }
}
