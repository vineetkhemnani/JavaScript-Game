window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 720;

    class InputHandler {
        // contain array of input key characters
        // apply eventListeners to the game
        constructor(){
            this.keys = [];
            window.addEventListener('keydown', e =>{
        // ES6 arrow function dont bind their own 'this' but they
        // inherit the one from their parent scope, this is called lexical scoping
                if ((   e.key === 'ArrowDown' || 
                        e.key === 'ArrowUp' ||
                        e.key === 'ArrowLeft' || 
                        e.key === 'ArrowRight') 
                        && this.keys.indexOf(e.key) === -1) {
                    this.keys.push(e.key);
                }
                // console.log(e.key, this.keys);
            });
            window.addEventListener('keyup', e =>{
            //  key released event handler
            //  find index of key pressed and remove it from keys array
                        if (e.key === 'ArrowDown' || 
                            e.key === 'ArrowUp' ||
                            e.key === 'ArrowLeft' || 
                            e.key === 'ArrowRight')  {
                            this.keys.splice(this.keys.indexOf(e.key), 1);
                        }
                        // console.log(e.key, this.keys);
                    });
        }
    }

    class Player {

    }

    class Background {

    }
    
    class Enemy {

    }

    function handleEnemies(){

    }

    function displayStatusText() {

    }

    const input = new InputHandler();

    function animate(){
        
    }
});