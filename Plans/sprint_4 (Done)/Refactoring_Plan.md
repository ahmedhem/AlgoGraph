## Storage

- Map<edge,arraypfweights>
list of nodes

-   Map<node,Map<node,array of weights>>m; m[start][end].push(weight)
    ->erasing the edge m[start][end].split(45)
    if(m[start][end].empty())m[node].erase(end);
   ---------------------------------------------------------
- Graph {   
    - set of nodes;
    - addNode(); 
    - removeNode();
    - addEdge(start,end);
    - removeEdge(start,end);
    - getEdge(start,end);
    - getNode(number)
}

- Node{ 
    - point position;
    - number;
    - set of edges;
    - addEdge(); 
    - removeEdge();
    - removeConnection();
}

- Edge{ 
    - Node start, end (number);
        - could be saved as the number of the node and then use the `find` method to find the node if you need it
    - list of weights; 
        - a set that does not allow duplicate values
    - addWeight()
    - Equal();
        - ##### _**used for ?!**_
        - two edge are equals if :
            - has the same start and end
            - the weight sets are equals (size & elements)

}

point{ x,y; Equal(); }
      
----------------


  
  
  
  
  
  