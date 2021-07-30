# Code
1. `handleClick()` :
    - if empty space :
        - `drawNode()`
    - else :`
        - `Toggle()`
    
-----
2. toggle :
    - if the node in the pair :
        - `remove()` 
    - else :
        - add it to the pair
    
    - _if the pair is full :_
        - `drawEdge()`
    
-----

- how to know if the space is empty or not ?    ~
    - if the point(x,y) is not inside the area of any node :
        - then it is an empty space
    
    - we need :
        - _a method to check if a point is inside a circle_ `TODO::`
    
------
# Data storage :
- NodeArrays
  - every node :
    - x
    - y
    
- EdgeArray
  - edge :
    - startNode
    - end Node
    - number ---> (don't know what this is)
- pair :
    - 2 nodes 
    
------------

