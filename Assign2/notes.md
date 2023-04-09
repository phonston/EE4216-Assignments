### 1. H2 console is giving white label error page
This is being H2 is not being added as a dependency properly due to pom.xml misconfiguration.
Remove "scope" from pom.xml as it specifies the condition for a dependency to run, removing it allows it to be added everytime.

### 2. Check that "JDBC URL" field is "jdbc:h2:mem:testdb" if Test Connection fails

### 3. Checkpoint 1
```
SELECT * from MOVIES;
```

### 4. Not sure if this is needed to be added in application.propertiers
server.servlet.context-path=/

### 5. Checkpoint 2
Just make sure to add the port 8080 into the url