//this garbage replicates a typescript enum to stay upstream compatible
var types;
(function (types) {
    types[types["ROOT"] = 0] = "ROOT";
    types[types["GROUP"] = 1] = "GROUP";
    types[types["POSITION"] = 2] = "POSITION";
    types[types["SET"] = 3] = "SET";
    types[types["RANGE"] = 4] = "RANGE";
    types[types["REPETITION"] = 5] = "REPETITION";
    types[types["REFERENCE"] = 6] = "REFERENCE";
    types[types["CHAR"] = 7] = "CHAR";
    
})(types || (types = {}));

export { types };