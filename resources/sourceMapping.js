var sourceRuntimeMapping = {}
sourceRuntimeMapping.mapping = '26:75:0:-;;;;;;;;;;;;;;;;;;;;;;;;60:38;;8:9:-1;5:2;;;30:1;27;20:12;5:2;60:38:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o'
sourceRuntimeMapping.source = `contract test {
    int x;

    int y;

    function set(int _x, int _y)
    {
        x = _x;
        y = _y;
    }

    function get() returns (uint x, uint y)
    {

    }
}`

if (typeof (module) !== 'undefined' && typeof (module.exports) !== 'undefined') {
  module.exports = sourceRuntimeMapping
}
