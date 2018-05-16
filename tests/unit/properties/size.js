
require('../../lib');

describe('property', function() {
    describe('size', function() {
            it('width', function() {
                var property = Property.parse(Component.new(createLayer('w100')));
                assert.equal(property.isValid(), true);
                assert.equal(property.key(), 'width');
                assert.equal(property.value(), 100);
            });

            it('width-addition', function() {
                var property = Property.parse(Component.new(createLayer('w+200')));
                assert.equal(property.isValid(), true);
                assert.equal(property.key(), 'width-addition');
                assert.equal(property.value(), 200);
            });

            it('width-subtraction', function() {
                var property = Property.parse(Component.new(createLayer('w-300')));
                assert.equal(property.isValid(), true);
                assert.equal(property.key(), 'width-addition');
                assert.equal(property.value(), -300);
            });

            it('width-percentage', function() {
                var property = Property.parse(Component.new(createLayer('w50%')));
                assert.equal(property.isValid(), true);
                assert.equal(property.key(), 'width-percentage');
                assert.equal(property.value(), 50);
            });

            it('width-percentage-full', function() {
                var property = Property.parse(Component.new(createLayer('w50%%')));
                assert.equal(property.isValid(), true);
                assert.equal(property.key(), 'width-percentage-full');
                assert.equal(property.value(), 50);
            });

            it('width-min', function() {
                var property = Property.parse(Component.new(createLayer('w>200')));
                assert.equal(property.isValid(), true);
                assert.equal(property.key(), 'width-min');
                assert.equal(property.value(), 200);
            });

            it('height', function() {
                var property = Property.parse(Component.new(createLayer('h100')));
                assert.equal(property.isValid(), true);
                assert.equal(property.key(), 'height');
                assert.equal(property.value(), 100);
            });

            it('height-addition', function() {
                var property = Property.parse(Component.new(createLayer('h+200')));
                assert.equal(property.isValid(), true);
                assert.equal(property.key(), 'height-addition');
                assert.equal(property.value(), 200);
            });

            it('height-subtraction', function() {
                var property = Property.parse(Component.new(createLayer('h-300')));
                assert.equal(property.isValid(), true);
                assert.equal(property.key(), 'height-addition');
                assert.equal(property.value(), -300);
            });

            it('height-percentage', function() {
                var property = Property.parse(Component.new(createLayer('h50%')));
                assert.equal(property.isValid(), true);
                assert.equal(property.key(), 'height-percentage');
                assert.equal(property.value(), 50);
            });

            it('height-percentage-full', function() {
                var property = Property.parse(Component.new(createLayer('h50%%')));
                assert.equal(property.isValid(), true);
                assert.equal(property.key(), 'height-percentage-full');
                assert.equal(property.value(), 50);
            });

            it('height-min', function() {
                var property = Property.parse(Component.new(createLayer('h>200')));
                assert.equal(property.isValid(), true);
                assert.equal(property.key(), 'height-min');
                assert.equal(property.value(), 200);
            });

            describe('apply', function() {
                        it('width', function() {
                            var component = Component.new(createLayer('w1', 1, 2, 3, 4));
                            var property = Property.parse(component);
                            property.apply();
                            assert.equal(component.frame().width(), 1);
                        });

                        it('width-addition', function() {
                            var component = Component.new(createLayer('w+1', 1, 2, 3, 4));
                            var property = Property.parse(component);
                            property.apply();
                            assert.equal(component.frame().width(), 4);
                        });

                        it('width-subtraction', function() {
                            var component = Component.new(createLayer('w-1', 1, 2, 3, 4));
                            var property = Property.parse(component);
                            property.apply();
                            assert.equal(component.frame().width(), 2);
                        });

                        it('width-percentage', function() {
                            var layer = createLayer('w50%', 1, 2, 3, 4);
                            var component = Component.new(layer);
                            var property = Property.parse(component);
                            property.apply();
                            assert.equal(component.frame().width(), 3);
                            var group = createLayerGroup('', 5, 7, 9, 11);
                            group.insertLayer_afterLayerOrAtEnd(layer);
                            property.apply();
                            assert.equal(component.frame().width(), 3);
                            var otherLayer = createLayer('', 13, 15, 17, 19);
                            group.insertLayer_afterLayerOrAtEnd(otherLayer);
                            property.apply();
                            assert.equal(component.frame().width(), 9);
                        });

                        it('width-percentage-full', function() {
                            var layer = createLayer('w50%%', 1, 2, 3, 4);
                            var component = Component.new(layer);
                            var property = Property.parse(component);
                            property.apply();
                            assert.equal(component.frame().width(), 3);
                            var group = createLayerGroup('', 5, 7, 9, 11);
                            group.insertLayer_afterLayerOrAtEnd(layer);
                            property.apply();
                            assert.equal(component.frame().width(), 5);
                            var otherLayer = createLayer('', 13, 15, 17, 19);
                            group.insertLayer_afterLayerOrAtEnd(otherLayer);
                            property.apply();
                            assert.equal(component.frame().width(), 5);
                        });

                        it('width-min', function() {
                            var component = Component.new(createLayer('w>10', 1, 2, 3, 4));
                            var property = Property.parse(component);
                            property.apply();
                            assert.equal(component.frame().width(), 10);
                            component.frame().setWidth(20);
                            property.apply();
                            assert.equal(component.frame().width(), 20);
                        });

                        it('height', function() {
                            var component = Component.new(createLayer('h1', 1, 2, 3, 4));
                            var property = Property.parse(component);
                            property.apply();
                            assert.equal(component.frame().height(), 1);
                        });

                        it('height-addition', function() {
                            var component = Component.new(createLayer('h+1', 1, 2, 3, 4));
                            var property = Property.parse(component);
                            property.apply();
                            assert.equal(component.frame().height(), 5);
                        });

                        it('height-subtraction', function() {
                            var component = Component.new(createLayer('h-1', 1, 2, 3, 4));
                            var property = Property.parse(component);
                            property.apply();
                            assert.equal(component.frame().height(), 3);
                        });

                        it('height-percentage', function() {
                            var layer = createLayer('h50%', 1, 2, 3, 4);
                            var component = Component.new(layer);
                            var property = Property.parse(component);
                            property.apply();
                            assert.equal(component.frame().height(), 4);
                            var group = createLayerGroup('', 5, 7, 9, 11);
                            group.insertLayer_afterLayerOrAtEnd(layer);
                            property.apply();
                            assert.equal(component.frame().height(), 4);
                            var otherLayer = createLayer('', 13, 15, 17, 19);
                            group.insertLayer_afterLayerOrAtEnd(otherLayer);
                            property.apply();
                            assert.equal(component.frame().height(), 10);
                        });

                        it('height-percentage-full', function() {
                            var layer = createLayer('h50%%', 1, 2, 3, 4);
                            var component = Component.new(layer);
                            var property = Property.parse(component);
                            property.apply();
                            assert.equal(component.frame().height(), 4);
                            var group = createLayerGroup('', 5, 7, 9, 11);
                            group.insertLayer_afterLayerOrAtEnd(layer);
                            property.apply();
                            assert.equal(component.frame().height(), 6);
                            var otherLayer = createLayer('', 13, 15, 17, 19);
                            group.insertLayer_afterLayerOrAtEnd(otherLayer);
                            property.apply();
                            assert.equal(component.frame().height(), 6);
                        });

                        it('height-min', function() {
                            var component = Component.new(createLayer('h>10', 1, 2, 3, 4));
                            var property = Property.parse(component);
                            property.apply();
                            assert.equal(component.frame().height(), 10);
                            component.frame().setHeight(20);
                            property.apply();
                            assert.equal(component.frame().height(), 20);
                        });

                        it('artboard', function() {
                            var layer = createArtboard('Artboard', 1, 2, 3, 4);
                            Component.apply(layer);
                            assert.equal(layer.frame().width(), 3);
                            layer.setName('Artboard [w100]');
                            Component.apply(layer);
                            assert.equal(layer.frame().width(), 100);
                        });

                        it('artboard (width 100% of 100%) (single sublayer)', function() {
                            var layer = createLayer('w100%');
                            var layerGroup = createLayerGroup();
                            layerGroup.insertLayer_afterLayerOrAtEnd(layer);
                            var artboard = createArtboard('artboard', 5, 6, 7, 8);
                            artboard.insertLayer_afterLayerOrAtEnd(layerGroup);
                            Component.apply(artboard);
                            assert.equal(layer.frame().width(), 1);
                            assert.equal(layer.frame().height(), 1);
                            assert.equal(artboard.frame().width(), 7);
                            assert.equal(artboard.frame().height(), 8);
                            layerGroup.setName('w100%');
                            Component.apply(artboard);
                            assert.equal(layer.frame().width(), 7);
                            assert.equal(layer.frame().height(), 1);
                            assert.equal(artboard.frame().width(), 7);
                            assert.equal(artboard.frame().height(), 8);
                        });

                        it('artboard (width 100% of 100%) (multiple sublayers)', function() {
                            var layer1 = createLayer('w100%');
                            var layer2 = createLayer('w3');
                            var layerGroup = createLayerGroup();
                            layerGroup.insertLayer_afterLayerOrAtEnd(layer1);
                            layerGroup.insertLayer_afterLayerOrAtEnd(layer2);
                            var artboard = createArtboard('artboard', 5, 6, 7, 8);
                            artboard.insertLayer_afterLayerOrAtEnd(layerGroup);
                            Component.apply(artboard);
                            assert.equal(layer1.frame().width(), 3);
                            assert.equal(layer1.frame().height(), 1);
                            layerGroup.setName('w100%');
                            Component.apply(artboard);
                            assert.equal(layer1.frame().width(), 7);
                            assert.equal(layer1.frame().height(), 1);
                        });

                        it('artboard (height 100% of 100%) (single sublayer)', function() {
                            var layer = createLayer('h100%');
                            var layerGroup = createLayerGroup();
                            layerGroup.insertLayer_afterLayerOrAtEnd(layer);
                            var artboard = createArtboard('artboard', 5, 6, 7, 8);
                            artboard.insertLayer_afterLayerOrAtEnd(layerGroup);
                            Component.apply(artboard);
                            assert.equal(layer.frame().width(), 1);
                            assert.equal(layer.frame().height(), 1);
                            assert.equal(artboard.frame().width(), 7);
                            assert.equal(artboard.frame().height(), 8);
                            layerGroup.setName('h100%');
                            Component.apply(artboard);
                            assert.equal(layer.frame().width(), 1);
                            assert.equal(layer.frame().height(), 8);
                            assert.equal(artboard.frame().width(), 7);
                            assert.equal(artboard.frame().height(), 8);
                        });

                        it('artboard (height 100% of 100%) (multiple sublayers)', function() {
                            var layer1 = createLayer('h100%');
                            var layer2 = createLayer('h3');
                            var layerGroup = createLayerGroup();
                            layerGroup.insertLayer_afterLayerOrAtEnd(layer1);
                            layerGroup.insertLayer_afterLayerOrAtEnd(layer2);
                            var artboard = createArtboard('artboard', 5, 6, 7, 8);
                            artboard.insertLayer_afterLayerOrAtEnd(layerGroup);
                            Component.apply(artboard);
                            assert.equal(layer1.frame().width(), 1);
                            assert.equal(layer1.frame().height(), 3);
                            layerGroup.setName('h100%');
                            Component.apply(artboard);
                            assert.equal(layer1.frame().width(), 1);
                            assert.equal(layer1.frame().height(), 8);
                        });

                        it('master', function() {
                            var layer = createSymbolMaster('Master', 1, 2, 3, 4);
                            Component.apply(layer);
                            assert.equal(layer.frame().width(), 3);
                            var layer = createSymbolMaster('Master [w100]', 1, 2, 3, 4);
                            Component.apply(layer);
                            assert.equal(layer.frame().width(), 100);
                        });

                        it('master (width 100% of 100%) (single sublayer)', function() {
                            var layer = createLayer('w100%');
                            var layerGroup = createLayerGroup();
                            layerGroup.insertLayer_afterLayerOrAtEnd(layer);
                            var master = createSymbolMaster('master', 5, 6, 7, 8);
                            master.insertLayer_afterLayerOrAtEnd(layerGroup);
                            Component.apply(master);
                            assert.equal(layer.frame().width(), 1);
                            assert.equal(layer.frame().height(), 1);
                            assert.equal(master.frame().width(), 1);
                            assert.equal(master.frame().height(), 1);
                            layerGroup.setName('w100%');
                            Component.apply(master);
                            assert.equal(layer.frame().width(), 1);
                            assert.equal(layer.frame().height(), 1);
                            assert.equal(master.frame().width(), 1);
                            assert.equal(master.frame().height(), 1);
                        });

                        it('master (height 100% of 100%) (single sublayer)', function() {
                            var layer = createLayer('h100%');
                            var layerGroup = createLayerGroup();
                            layerGroup.insertLayer_afterLayerOrAtEnd(layer);
                            var master = createSymbolMaster('master', 5, 6, 7, 8);
                            master.insertLayer_afterLayerOrAtEnd(layerGroup);
                            Component.apply(master);
                            assert.equal(layer.frame().width(), 1);
                            assert.equal(layer.frame().height(), 1);
                            assert.equal(master.frame().width(), 1);
                            assert.equal(master.frame().height(), 1);
                            layerGroup.setName('h100%');
                            Component.apply(master);
                            assert.equal(layer.frame().width(), 1);
                            assert.equal(layer.frame().height(), 1);
                            assert.equal(master.frame().width(), 1);
                            assert.equal(master.frame().height(), 1);
                        });
                    });
        });
});
