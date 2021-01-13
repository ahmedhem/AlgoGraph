##Eid
1. Styling (Done)

2. Storage (in progress)
      - the edge :(weight, directed or undirected) `[done]`
      - one notifier for both nodes and edges and  `[done]`
      - one drawUI method that update the canvas `[done]`


3. save (Done)
    - what should happen when the save button clicked ?
        - the `saveGraph` should get called
    - `saveGraph()`
        - should copy the nodes and edges arrays and return them
            - return them where ?
                - console log them for now...?
4. the redraw after resizing, and the toggle style
    - redraw `[done]`
    - toggle `[done]`
    

##Magdy
1. Styling(postponde)
2. drawing(done except the direction)
3. remove(done)
4. clear and fix the bug (done)

------------

### notes:
- Direction feature need to be done
- _AE >>>_ the canvas width and height need to be taking from the css and there for if the css size changes (the screen resizing)
    - the canvas width and height need to be updated
        - `the refresh need to be added`
----
- _AE >>>_ updating the notifier of the nodes and edges to use the same notifier `UiNotifier`
---
---
-  _AE >>>_ **if the canvas resize**     
    -  **all the nodes(x, y) stored become invalid** 
        - _**so for now all the nodes and edges get removed when you resize**_

