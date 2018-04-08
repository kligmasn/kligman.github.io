
document.addEventListener("DOMContentLoaded", () => {
    var context = new (window.AudioContext || window.webkitAudioContext)();

    var noteDisplayList = document.getElementById("noteDisplay");

    var activeNodes = {};

    navigator.requestMIDIAccess().then((access) => {

        const outputs = access.outputs.values();

        access.inputs.forEach( function( port, key ) {
            if(port.name == "Q49") inputPort = port;
        });

        inputPort.addEventListener("midimessage", (message) => {
            if(message.data[0] == 144){
                activeNodes[message.data[1]] = newOsc(message.data[1]);//Store and create new oscillator
                activeNodes[message.data[1]].connect(context.destination); //Connect to audio context
                addToList(document.createElement("p"), message.data[1]);
            }
            else {
                activeNodes[message.data[1]].disconnect(context.destination);
                delete activeNodes[message.data[1]];
            }
        });
        
        access.onstatechange = function(e) {
            console.log(e);
        };
    });

    function midi2freq(note){
        //base A4 = 220 HZ
        return 220 * Math.pow(2, (note-57)/12);
    }

    function newOsc(freq) {
        var oscillator = context.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.value = freq;
        oscillator.start();
        return oscillator;
    }

    function addToList(item, MidiNoteNumber){
        checkList();
        item.id = "noteDisplayItem";
        item.innerText = note2letter(MidiNoteNumber);
        noteDisplayList.appendChild(item);
    }
    
    function checkList() {
        if (noteDisplayList.children.length > 4){
            noteDisplayList.removeChild(noteDisplayList.getElementsByTagName("p")[0]);
        }
    }

    function note2letter(note){
        var letterMap = {60: "C4", 61: "C#4", 62: "D4", 63: "D#4", 64: "E4"
        , 65: "F4", 66: "F#4", 67: "G4", 68: "G#4", 69: "A4", 70: "A#4"
        , 71: "B4", 72: "C5", 73: "C#5", 74: "D5", 75: "D#5", 76: "E5"
        , 77: "F5", 78: "F#5", 79: "G5", 80: "G#5", 81: "A5", 82: "A#5"
        , 83: "B5"};

        return letterMap[note];
    }
});