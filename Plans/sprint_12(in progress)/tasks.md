## AM
- adding undo to almost all animations(almost done :)
- handling the final state of every animation
- try to visualize one algorithm

--- bugs founded : 
- when we add another weight to an edge, duplicates weights not allowed because of SET
  Solution: use multiset;

- any weight has drawn on the canvas will be disappered after calling UI.fire();
  Solution : firstly all the logic of the fix will be seperated from Canvas function.



## AE
- swap_animation >> refactor [done]

### Not finished
- fix: https://github.com/ahmedhem/AlgoGraph/issues/19 (I was not able to fix it)
  - solution:
    - the logic of drawing edges need to be rewritten in a trackable way and in a way which 
    I should be able to hook into to check the stroke path 
    - need more explaining on: the direction 
 
- try to visualize one algorithm >> there was no time >>
  - reason: worked for 4 hours on different solutions for the bug and bad designs for the Visualizer   

- visualizer:
  - really useless (.....what I built was useless...I maybe wrong) 
