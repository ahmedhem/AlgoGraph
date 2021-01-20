## Storage

- Map<edge,arraypfweights>
list of nodes

-   Map<node,Map<node,array of weights>>m; m[start][end].push(weight)
    ->erasing the edge m[start][end].split(45)
    if(m[start][end].empty())m[node].erase(end);
   ---------------------------------------------------------
- Graph{   
    - set of nodes;
    - addNode(); 
    - removeNode();
    - addEdge(start,end);
    - removeEdge(start,end);
    - getEdge(start,end);
    - getNode(number); }

Node{ set of edges; point p; number; addEdge(); removeEdge(); removeConnection();

    }

Edge{ Node start,end; list of weights; Equal();

}

point{ x,y; Equal(); }
      


    
  
  
  
  
  
  