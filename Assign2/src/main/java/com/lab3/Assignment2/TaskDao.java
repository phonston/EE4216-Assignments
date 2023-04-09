package com.lab3.Assignment2;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

@org.springframework.context.annotation.Configuration
public class TaskDao {
    @Autowired
    JdbcTemplate jdbcTemplate;

    // create a method to get all tasks from the database
    public ArrayList<Task> getAllTasks() {

        ArrayList<Task> tasks = new ArrayList<Task>();

        try {
            tasks = (ArrayList<Task>) jdbcTemplate.query("SELECT * FROM TASKS",
                    (rs, rowNum) -> new Task(rs.getInt("ID"), rs.getString("NAME"),
                            rs.getBoolean("COMPLETED"), rs.getInt("TIMER")));
        } catch (Exception e) {
            System.out.println(e);
        }

        return tasks;
    }

    public String addTask(String name) {
        try {
            String sql = "INSERT INTO TASKS (name) VALUES (?)";
            jdbcTemplate.update(sql, name);

            return "Task added successfully";
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return "Task add failed";
        }
    }

    public String updateTask(Task task) {
        try {
            String sql = "UPDATE TASKS SET completed=?, timer=? WHERE id=?";
            jdbcTemplate.update(sql, task.getCompleted(), task.getTimer(), task.getId());

            return "Task updated successfully";
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return "Task update failed";
        }
    }

    public String deleteTask(int id) {
        try {
            String sql = "DELETE FROM TASKS WHERE id=?";
            jdbcTemplate.update(sql, id);

            return "Task deleted successfully";
        } catch (Exception e) {
            System.out.println(e);
            return "Task delete failed";
        }
    }
}
