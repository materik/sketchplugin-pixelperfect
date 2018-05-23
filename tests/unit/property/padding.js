
var index = require('../..');

var Component = index.require.component();
var PaddingProperty = index.require.property.padding();
var Property = index.require.property();

describe('property', function() {
    describe('padding', function() {
        it('type', function() {
            var artboard = createArtboard()
            artboard.insertLayer_afterLayerOrAtEnd(createLayer())
            var property = PaddingProperty.top(Component.init(artboard))
            assert.equal(property.type(), 'padding');
            var property = PaddingProperty.bottom(Component.init(artboard))
            assert.equal(property.type(), 'padding');
        })

        describe('modify', function() {
            it('full', function() {
                assert.equal(PaddingProperty.modify('padding'), 'pt:pr:pb:pl');
                assert.equal(PaddingProperty.modify('p'), 'pt:pr:pb:pl');
                assert.equal(PaddingProperty.modify('p10'), 'pt10:pr10:pb10:pl10');
                assert.equal(PaddingProperty.modify('h+100:padding:w+100'), 'h+100:pt:pr:pb:pl:w+100');
                assert.equal(PaddingProperty.modify('h+100:p:w+100'), 'h+100:pt:pr:pb:pl:w+100');
            })

            it('numbers', function() {
                assert.equal(PaddingProperty.modify('0'), 'pt0:pr0:pb0:pl0');
                assert.equal(PaddingProperty.modify('1:2'), 'pt1:pb1:pr2:pl2');
                assert.equal(PaddingProperty.modify('1:2:3'), 'pt1:pr2:pl2:pb3');
                assert.equal(PaddingProperty.modify('1:2:3:4'), 'pt1:pr2:pb3:pl4');
                assert.equal(PaddingProperty.modify('h+100:0:w+100'), 'h+100:pt0:pr0:pb0:pl0:w+100');
                assert.equal(PaddingProperty.modify('h+100:1:2:w+100'), 'h+100:pt1:pb1:pr2:pl2:w+100');
                assert.equal(PaddingProperty.modify('h+100:1:2:3:w+100'), 'h+100:pt1:pr2:pl2:pb3:w+100');
                assert.equal(PaddingProperty.modify('h+100:1:2:3:4:w+100'), 'h+100:pt1:pr2:pb3:pl4:w+100');
                assert.equal(PaddingProperty.modify('h+100:1:2:3:4:5:w+100'), 'h+100:pt1:pr2:pb3:pl4:5:w+100');
                assert.equal(PaddingProperty.modify('h+100:1:2:w+100:3:4'), 'h+100:pt1:pr2:w+100:pb3:pl4');
            });

            it('left-right / top-bottom', function() {
                assert.equal(PaddingProperty.modify('plr'), 'pr:pl')
                assert.equal(PaddingProperty.modify('plr10'), 'pr10:pl10')
                assert.equal(PaddingProperty.modify('prl'), 'pr:pl')
                assert.equal(PaddingProperty.modify('prl10'), 'pr10:pl10')
                assert.equal(PaddingProperty.modify('ptb'), 'pt:pb')
                assert.equal(PaddingProperty.modify('ptb10'), 'pt10:pb10')
                assert.equal(PaddingProperty.modify('pbt'), 'pt:pb')
                assert.equal(PaddingProperty.modify('pbt10'), 'pt10:pb10')
            })
        });

        describe('outer', function() {
            it('top', function() {
                var layer = createLayer('pt10', 0, 0, 50, 100);
                var container = createLayer('bg', 0, 0, 100, 200);
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Component.init(layer).apply();
                assert.equal(layer.frame().x(), 25);
                assert.equal(layer.frame().y(), 10);
                assert.equal(container.frame().width(), 100);
                assert.equal(container.frame().height(), 200);
            });

            it('right', function() {
                var layer = createLayer('pr10', 0, 0, 50, 100);
                var container = createLayer('bg', 0, 0, 100, 200);
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Component.init(layer).apply();
                assert.equal(layer.frame().x(), 40);
                assert.equal(layer.frame().y(), 50);
                assert.equal(container.frame().width(), 100);
                assert.equal(container.frame().height(), 200);
            });

            it('bottom', function() {
                var layer = createLayer('pb10', 0, 0, 50, 100);
                var container = createLayer('bg', 0, 0, 100, 200);
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Component.init(layer).apply();
                assert.equal(layer.frame().x(), 25);
                assert.equal(layer.frame().y(), 90);
                assert.equal(container.frame().width(), 100);
                assert.equal(container.frame().height(), 200);
            });

            it('left', function() {
                var layer = createLayer('pl10', 0, 0, 50, 100);
                var container = createLayer('bg', 0, 0, 100, 200);
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Component.init(layer).apply();
                assert.equal(layer.frame().x(), 10);
                assert.equal(layer.frame().y(), 50);
                assert.equal(container.frame().width(), 100);
                assert.equal(container.frame().height(), 200);
            });

            it('top-right', function() {
                var layer = createLayer('pt10:pr10', 0, 0, 50, 100);
                var container = createLayer('bg', 0, 0, 100, 200);
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Component.init(layer).apply();
                assert.equal(layer.frame().x(), 40);
                assert.equal(layer.frame().y(), 10);
                assert.equal(container.frame().width(), 100);
                assert.equal(container.frame().height(), 200);
            });

            it('top-bottom', function() {
                var layer = createLayer('pt10:pb10', 0, 0, 50, 100);
                var container = createLayer('bg', 0, 0, 100, 200);
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Component.init(layer).apply();
                assert.equal(layer.frame().x(), 25);
                assert.equal(layer.frame().y(), 10);
                assert.equal(container.frame().width(), 100);
                assert.equal(container.frame().height(), 120);
            });

            it('top-left', function() {
                var layer = createLayer('pt10:pl10', 0, 0, 50, 100);
                var container = createLayer('bg', 0, 0, 100, 200);
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Component.init(layer).apply();
                assert.equal(layer.frame().x(), 10);
                assert.equal(layer.frame().y(), 10);
                assert.equal(container.frame().width(), 100);
                assert.equal(container.frame().height(), 200);
            });

            it('right-bottom', function() {
                var layer = createLayer('pr10:pb10', 0, 0, 50, 100);
                var container = createLayer('bg', 0, 0, 100, 200);
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Component.init(layer).apply();
                assert.equal(layer.frame().x(), 40);
                assert.equal(layer.frame().y(), 90);
                assert.equal(container.frame().width(), 100);
                assert.equal(container.frame().height(), 200);
            });

            it('right-left', function() {
                var layer = createLayer('pr10:pl10', 0, 0, 50, 100);
                var container = createLayer('bg', 0, 0, 100, 200);
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Component.init(layer).apply();
                assert.equal(layer.frame().x(), 10);
                assert.equal(layer.frame().y(), 50);
                assert.equal(container.frame().width(), 70);
                assert.equal(container.frame().height(), 200);
            });

            it('bottom-left', function() {
                var layer = createLayer('pb10:pl10', 0, 0, 50, 100);
                var container = createLayer('bg', 0, 0, 100, 200);
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Component.init(layer).apply();
                assert.equal(layer.frame().x(), 10);
                assert.equal(layer.frame().y(), 90);
                assert.equal(container.frame().width(), 100);
                assert.equal(container.frame().height(), 200);
            });

            it('top-right-bottom', function() {
                var layer = createLayer('pt10:pr10:pb10', 0, 0, 50, 100);
                var container = createLayer('bg', 0, 0, 100, 200);
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Component.init(layer).apply();
                assert.equal(layer.frame().x(), 40);
                assert.equal(layer.frame().y(), 10);
                assert.equal(container.frame().width(), 100);
                assert.equal(container.frame().height(), 120);
            });

            it('top-right-left', function() {
                var layer = createLayer('pt10:pr10:pl10', 0, 0, 50, 100);
                var container = createLayer('bg', 0, 0, 100, 200);
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Component.init(layer).apply();
                assert.equal(layer.frame().x(), 10);
                assert.equal(layer.frame().y(), 10);
                assert.equal(container.frame().width(), 70);
                assert.equal(container.frame().height(), 200);
            });

            it('top-bottom-left', function() {
                var layer = createLayer('pt10:pb10:pl10', 0, 0, 50, 100);
                var container = createLayer('bg', 0, 0, 100, 200);
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Component.init(layer).apply();
                assert.equal(layer.frame().x(), 10);
                assert.equal(layer.frame().y(), 10);
                assert.equal(container.frame().width(), 100);
                assert.equal(container.frame().height(), 120);
            });

            it('right-bottom-left', function() {
                var layer = createLayer('pr10:pb10:pl10', 0, 0, 50, 100);
                var container = createLayer('bg', 0, 0, 100, 200);
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Component.init(layer).apply();
                assert.equal(layer.frame().x(), 10);
                assert.equal(layer.frame().y(), 90);
                assert.equal(container.frame().width(), 70);
                assert.equal(container.frame().height(), 200);
            });

            it('top-right-bottom-left', function() {
                var layer = createLayer('pt10:pr10:pb10:pl10', 0, 0, 50, 100);
                var container = createLayer('bg', 0, 0, 100, 200);
                var group = createLayerGroup();
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Component.init(layer).apply();
                assert.equal(layer.frame().x(), 10);
                assert.equal(layer.frame().y(), 10);
                assert.equal(container.frame().width(), 70);
                assert.equal(container.frame().height(), 120);
            });
        });

        describe('inner', function() {
            it('top', function() {
                var layer = createLayer('', 0, 0, 50, 100);
                var container = createLayer('bg', 0, 0, 100, 200);
                var group = createLayerGroup('pt10');
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Component.init(group).apply();
                assert.equal(layer.frame().x(), 25);
                assert.equal(layer.frame().y(), 10);
                assert.equal(container.frame().width(), 100);
                assert.equal(container.frame().height(), 200);
            });

            it('right', function() {
                var layer = createLayer('', 0, 0, 50, 100);
                var container = createLayer('bg', 0, 0, 100, 200);
                var group = createLayerGroup('pr10');
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Component.init(group).apply();
                assert.equal(layer.frame().x(), 40);
                assert.equal(layer.frame().y(), 50);
                assert.equal(container.frame().width(), 100);
                assert.equal(container.frame().height(), 200);
            });

            it('bottom', function() {
                var layer = createLayer('', 0, 0, 50, 100);
                var container = createLayer('bg', 0, 0, 100, 200);
                var group = createLayerGroup('pb10');
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Component.init(group).apply();
                assert.equal(layer.frame().x(), 25);
                assert.equal(layer.frame().y(), 90);
                assert.equal(container.frame().width(), 100);
                assert.equal(container.frame().height(), 200);
            });

            it('left', function() {
                var layer = createLayer('', 0, 0, 50, 100);
                var container = createLayer('bg', 0, 0, 100, 200);
                var group = createLayerGroup('pl10');
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Component.init(group).apply();
                assert.equal(layer.frame().x(), 10);
                assert.equal(layer.frame().y(), 50);
                assert.equal(container.frame().width(), 100);
                assert.equal(container.frame().height(), 200);
            });

            it('top-right', function() {
                var layer = createLayer('', 0, 0, 50, 100);
                var container = createLayer('bg', 0, 0, 100, 200);
                var group = createLayerGroup('pt10:pr10');
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Component.init(group).apply();
                assert.equal(layer.frame().x(), 40);
                assert.equal(layer.frame().y(), 10);
                assert.equal(container.frame().width(), 100);
                assert.equal(container.frame().height(), 200);
            });

            it('top-bottom', function() {
                var layer = createLayer('', 0, 0, 50, 100);
                var container = createLayer('bg', 0, 0, 100, 200);
                var group = createLayerGroup('pt10:pb10');
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Component.init(group).apply();
                assert.equal(layer.frame().x(), 25);
                assert.equal(layer.frame().y(), 10);
                assert.equal(container.frame().width(), 100);
                assert.equal(container.frame().height(), 120);
            });

            it('top-left', function() {
                var layer = createLayer('', 0, 0, 50, 100);
                var container = createLayer('bg', 0, 0, 100, 200);
                var group = createLayerGroup('pt10:pl10');
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Component.init(group).apply();
                assert.equal(layer.frame().x(), 10);
                assert.equal(layer.frame().y(), 10);
                assert.equal(container.frame().width(), 100);
                assert.equal(container.frame().height(), 200);
            });

            it('right-bottom', function() {
                var layer = createLayer('', 0, 0, 50, 100);
                var container = createLayer('bg', 0, 0, 100, 200);
                var group = createLayerGroup('pr10:pb10');
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Component.init(group).apply();
                assert.equal(layer.frame().x(), 40);
                assert.equal(layer.frame().y(), 90);
                assert.equal(container.frame().width(), 100);
                assert.equal(container.frame().height(), 200);
            });

            it('right-left', function() {
                var layer = createLayer('', 0, 0, 50, 100);
                var container = createLayer('bg', 0, 0, 100, 200);
                var group = createLayerGroup('pr10:pl10');
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Component.init(group).apply();
                assert.equal(layer.frame().x(), 10);
                assert.equal(layer.frame().y(), 50);
                assert.equal(container.frame().width(), 70);
                assert.equal(container.frame().height(), 200);
            });

            it('bottom-left', function() {
                var layer = createLayer('', 0, 0, 50, 100);
                var container = createLayer('bg', 0, 0, 100, 200);
                var group = createLayerGroup('pb10:pl10');
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Component.init(group).apply();
                assert.equal(layer.frame().x(), 10);
                assert.equal(layer.frame().y(), 90);
                assert.equal(container.frame().width(), 100);
                assert.equal(container.frame().height(), 200);
            });

            it('top-right-bottom', function() {
                var layer = createLayer('', 0, 0, 50, 100);
                var container = createLayer('bg', 0, 0, 100, 200);
                var group = createLayerGroup('pt10:pr10:pb10');
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Component.init(group).apply();
                assert.equal(layer.frame().x(), 40);
                assert.equal(layer.frame().y(), 10);
                assert.equal(container.frame().width(), 100);
                assert.equal(container.frame().height(), 120);
            });

            it('top-right-left', function() {
                var layer = createLayer('', 0, 0, 50, 100);
                var container = createLayer('bg', 0, 0, 100, 200);
                var group = createLayerGroup('pt10:pr10:pl10');
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Component.init(group).apply();
                assert.equal(layer.frame().x(), 10);
                assert.equal(layer.frame().y(), 10);
                assert.equal(container.frame().width(), 70);
                assert.equal(container.frame().height(), 200);
            });

            it('top-bottom-left', function() {
                var layer = createLayer('', 0, 0, 50, 100);
                var container = createLayer('bg', 0, 0, 100, 200);
                var group = createLayerGroup('pt10:pb10:pl10');
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Component.init(group).apply();
                assert.equal(layer.frame().x(), 10);
                assert.equal(layer.frame().y(), 10);
                assert.equal(container.frame().width(), 100);
                assert.equal(container.frame().height(), 120);
            });

            it('right-bottom-left', function() {
                var layer = createLayer('', 0, 0, 50, 100);
                var container = createLayer('bg', 0, 0, 100, 200);
                var group = createLayerGroup('pr10:pb10:pl10');
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Component.init(group).apply();
                assert.equal(layer.frame().x(), 10);
                assert.equal(layer.frame().y(), 90);
                assert.equal(container.frame().width(), 70);
                assert.equal(container.frame().height(), 200);
            });

            it('top-right-bottom-left', function() {
                var layer = createLayer('', 0, 0, 50, 100);
                var container = createLayer('bg', 0, 0, 100, 200);
                var group = createLayerGroup('pt10:pr10:pb10:pl10');
                group.insertLayer_afterLayerOrAtEnd(layer);
                group.insertLayer_afterLayerOrAtEnd(container);
                Component.init(group).apply();
                assert.equal(layer.frame().x(), 10);
                assert.equal(layer.frame().y(), 10);
                assert.equal(container.frame().width(), 70);
                assert.equal(container.frame().height(), 120);
            });
        });

        describe('master-artboard', function() {
            it('artboard (without padding)', function() {
                var layer = createLayer('', 5, 5, 50, 100);
                var artboard = createArtboard('', 0, 0, 100, 200);
                artboard.insertLayer_afterLayerOrAtEnd(layer);
                Component.init(artboard).apply();
                assert.equal(layer.frame().x(), 5);
                assert.equal(layer.frame().y(), 5);
                assert.equal(artboard.frame().width(), 100);
                assert.equal(artboard.frame().height(), 200);
            });

            it('artboard (with padding)', function() {
                var layer = createLayer('', 5, 5, 50, 100);
                var artboard = createArtboard('pt10:pr10:pb10:pl10', 0, 0, 100, 200);
                artboard.insertLayer_afterLayerOrAtEnd(layer);
                Component.init(artboard).apply();
                assert.equal(layer.frame().x(), 10);
                assert.equal(layer.frame().y(), 10);
                assert.equal(artboard.frame().width(), 70);
                assert.equal(artboard.frame().height(), 120);
            });

            it('artboard (multiple sublayers)', function() {
                var layer1 = createLayer('layer 1', 30, 40, 50, 60);
                var layer2 = createLayer('layer 2', 25, 50, 100, 200);
                var artboard = createArtboard('10:20:30:40', 1, 2, 3, 4);
                artboard.insertLayer_afterLayerOrAtEnd(layer1);
                artboard.insertLayer_afterLayerOrAtEnd(layer2);
                Component.init(artboard).apply();
                assert.equal(layer1.frame().x(), 45);
                assert.equal(layer1.frame().y(), 10);
                assert.equal(layer1.frame().width(), 50);
                assert.equal(layer1.frame().height(), 60);
                assert.equal(layer2.frame().x(), 40);
                assert.equal(layer2.frame().y(), 20);
                assert.equal(layer2.frame().width(), 100);
                assert.equal(layer2.frame().height(), 200);
                assert.equal(artboard.frame().width(), 160);
                assert.equal(artboard.frame().height(), 250);
            });

            it('artboard (margin right-bottom)', function() {
                var layer1 = createLayer('layer', 30, 40, 50, 60);
                var layer2 = createLayer('r:b', 25, 50, 30, 20);
                var artboard = createArtboard('10:20:30:40', 1, 2, 3, 4);
                artboard.insertLayer_afterLayerOrAtEnd(layer1);
                artboard.insertLayer_afterLayerOrAtEnd(layer2);
                Component.init(artboard).apply();
                assert.equal(layer1.frame().x(), 40);
                assert.equal(layer1.frame().y(), 10);
                assert.equal(layer1.frame().width(), 50);
                assert.equal(layer1.frame().height(), 60);
                assert.equal(layer2.frame().x(), 80);
                assert.equal(layer2.frame().y(), 80);
                assert.equal(layer2.frame().width(), 30);
                assert.equal(layer2.frame().height(), 20);
                assert.equal(artboard.frame().width(), 110);
                assert.equal(artboard.frame().height(), 100);
            });

            it('master (without padding)', function() {
                var layer = createLayer('', 5, 5, 50, 100);
                var master = createSymbolMaster('', 0, 0, 100, 200);
                master.insertLayer_afterLayerOrAtEnd(layer);
                Component.init(master).apply();
                assert.equal(layer.frame().x(), 0);
                assert.equal(layer.frame().y(), 0);
                assert.equal(master.frame().width(), 50);
                assert.equal(master.frame().height(), 100);
            });

            it('master (with padding)', function() {
                var layer = createLayer('', 5, 5, 50, 100);
                var master = createSymbolMaster('pt10:pr10:pb10:pl10', 0, 0, 100, 200);
                master.insertLayer_afterLayerOrAtEnd(layer);
                Component.init(master).apply();
                assert.equal(layer.frame().x(), 10);
                assert.equal(layer.frame().y(), 10);
                assert.equal(master.frame().width(), 70);
                assert.equal(master.frame().height(), 120);
            });

            it('master (multiple sublayers)', function() {
                var layer1 = createLayer('layer 1', 30, 40, 50, 60);
                var layer2 = createLayer('layer 2', 25, 50, 100, 200);
                var master = createSymbolMaster('master', 1, 2, 3, 4);
                master.insertLayer_afterLayerOrAtEnd(layer1);
                master.insertLayer_afterLayerOrAtEnd(layer2);
                Component.init(master).apply();
                assert.equal(layer1.frame().x(), 5);
                assert.equal(layer1.frame().y(), 0);
                assert.equal(layer1.frame().width(), 50);
                assert.equal(layer1.frame().height(), 60);
                assert.equal(layer2.frame().x(), 0);
                assert.equal(layer2.frame().y(), 10);
                assert.equal(layer2.frame().width(), 100);
                assert.equal(layer2.frame().height(), 200);
                assert.equal(master.frame().width(), 100);
                assert.equal(master.frame().height(), 210);
            });

            it('master (margin right-bottom)', function() {
                var layer1 = createLayer('layer', 30, 40, 50, 60);
                var layer2 = createLayer('r:b', 25, 50, 30, 20);
                var master = createSymbolMaster('10:20:30:40', 1, 2, 3, 4);
                master.insertLayer_afterLayerOrAtEnd(layer1);
                master.insertLayer_afterLayerOrAtEnd(layer2);
                Component.init(master).apply();
                assert.equal(layer1.frame().x(), 40);
                assert.equal(layer1.frame().y(), 10);
                assert.equal(layer1.frame().width(), 50);
                assert.equal(layer1.frame().height(), 60);
                assert.equal(layer2.frame().x(), 80);
                assert.equal(layer2.frame().y(), 80);
                assert.equal(layer2.frame().width(), 30);
                assert.equal(layer2.frame().height(), 20);
                assert.equal(master.frame().width(), 110);
                assert.equal(master.frame().height(), 100);
            });
        });

        describe('init', function() {
            it('padding-top', function() {
                var artboard = createArtboard()
                artboard.insertLayer_afterLayerOrAtEnd(createLayer())
                var property = PaddingProperty.top(Component.init(artboard))
                assert.equal(property.key(), 'padding-top')
                assert.equal(property.value(), 0)
                var property = PaddingProperty.top(Component.init(artboard), 10)
                assert.equal(property.key(), 'padding-top')
                assert.equal(property.value(), 10)
            })

            it('padding-right', function() {
                var artboard = createArtboard()
                artboard.insertLayer_afterLayerOrAtEnd(createLayer())
                var property = PaddingProperty.right(Component.init(artboard))
                assert.equal(property.key(), 'padding-right')
                assert.equal(property.value(), 0)
                var property = PaddingProperty.right(Component.init(artboard), 10)
                assert.equal(property.key(), 'padding-right')
                assert.equal(property.value(), 10)
            })

            it('padding-bottom', function() {
                var artboard = createArtboard()
                artboard.insertLayer_afterLayerOrAtEnd(createLayer())
                var property = PaddingProperty.bottom(Component.init(artboard))
                assert.equal(property.key(), 'padding-bottom')
                assert.equal(property.value(), 0)
                var property = PaddingProperty.bottom(Component.init(artboard), 10)
                assert.equal(property.key(), 'padding-bottom')
                assert.equal(property.value(), 10)
            })

            it('padding-left', function() {
                var artboard = createArtboard()
                artboard.insertLayer_afterLayerOrAtEnd(createLayer())
                var property = PaddingProperty.left(Component.init(artboard))
                assert.equal(property.key(), 'padding-left')
                assert.equal(property.value(), 0)
                var property = PaddingProperty.left(Component.init(artboard), 10)
                assert.equal(property.key(), 'padding-left')
                assert.equal(property.value(), 10)
            })
        });
    });
});
