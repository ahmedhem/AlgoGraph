#### Un solved bugs :
    - some graphs can't be compeletly drawn because of the nodes in each row are more than the availble cells
    - the program can  do bfs for only one components not many
    - bfs start from node 1 so if the user's input doesn't have node 1 it won't work 
    - the bfs act strange when we create an edge from node 2 to 1 (not from 1 to 2)
-----

### toolBox:
- draggable and has modern style

### Feature: add color to a node
- from the context-menu i want an option to change the node color (maybe a color-picker)

### Feature: add delete Node to the context-menu (easy)

### Feature: Save
- Save for .txt (text, matrix)
    - https://github.com/eligrey/FileSaver.js/blob/master/src/FileSaver.js (read the code and implement it by your own)
- Save as image 
---

----
### refactoring :
- try to split the code into components (more file less code)
