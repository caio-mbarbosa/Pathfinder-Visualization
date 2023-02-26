var mapa;

var INCREMENTAL_BFS = true;
var hasFound = false;
var hasPrintedPath = false;
var hasArrived = false;
var count = 0;


function setup() {
  frameRate(60);
  createCanvas(800, 600);
  background(50);
  mapa = new Map(800, 600, 18, 18);
  
  if(INCREMENTAL_BFS){
    mapa.initialize_visited();
    mapa.setup_incremental_bfs();
  }
}

function draw() {
  
  //If showed path, then walk
  if(hasPrintedPath && !hasArrived){
    hasFinished = true;
    
    mapa.walk(count);
    count = count+1;
    
    if(mapa.agent_pos_x == mapa.target_pos_x && mapa.agent_pos_y == mapa.target_pos_y){
      hasArrived = true;
      noLoop();
    }
    
  }
  
  //If finded path, then show it
  if(hasFound && !hasPrintedPath){
    mapa.print_path(count);
    count = count + 1;
    
    if(count == mapa.path.length){
      hasPrintedPath = true;
      count = 0;
    }
  }
  
  
  // Find the path
  if(INCREMENTAL_BFS && !hasFound){
    if(mapa.visited[mapa.target_pos_y][mapa.target_pos_x]){
      hasFound = true;
    }
    
    mapa.incremental_bfs();
  }
  
  mapa.show();
}
