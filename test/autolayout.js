
require('./lib')

describe('autoLayout', function() {

    it('isAutoLayoutAppliedToLayer', function() {
        assert.equal(isAutoLayoutAppliedToExampleLayer(examples.true, 0), true)
        assert.equal(isAutoLayoutAppliedToExampleLayer(examples.true, 1), true)
        assert.equal(isAutoLayoutAppliedToExampleLayer(examples.true, 2), true)
        assert.equal(isAutoLayoutAppliedToExampleLayer(examples.false, 0), false)
    })

})

// -----------------------------------------------------------

var isAutoLayoutAppliedToExampleLayer = function(example, index) {
    return isAutoLayoutAppliedToLayer(createExampleLayerWithAutoLayout(example,index))
}

var createExampleLayerWithAutoLayout = function(example, index) {
    var layer = createLayer()
    layer._setUserInfo(example[index])
    return layer
}

var examples = {

    true: [
        {
           "com.animaapp.stc-sketch-plugin": {
                kModelPropertiesKey: {
                    align: 0,
                    isCollapsing: 1,
                    spacing: 16,
                    type: 1,
                },
                kViewTypeKey: "ADModelStackView",
            },
        },

        {
            "com.animaapp.stc-sketch-plugin": {
                kModelPropertiesKey: {
                    constraints: {
                        automatic: 1,
                        modelID: "viewConstraints_defeff1d-9fec-4c3c-9356-074c161355d4",
                        model_class: "ADModelViewConstraints",
                        model_version: "0.1",
                        scaleFactor: 1,
                        top: {
                            constant: 108,
                            enabled: 1,
                            modelID: "constraint_cd1d69bd-7cb1-4851-99bc-b6f83a991806",
                            model_class: "ADModelConstraint",
                            model_version: "0.1",
                            multiplier: 0,
                        },
                    },
                },
            },
        },

        {
            "com.animaapp.stc-sketch-plugin": {
                kModelPropertiesKey: {
                    constraints: {
                        automatic: 1,
                        centerHorizontally: {
                            constant: 0,
                            enabled: 1,
                            modelID: "constraint_2caee200-3501-47d2-8d6f-1e2ffe8e8381",
                            "model_class": "ADModelConstraint",
                            "model_version": "0.1",
                            multiplier: 0,
                        },
                        modelID: "viewConstraints_afe2cee2-8da8-4085-a141-7c2aa0d99d97",
                        "model_class": "ADModelViewConstraints",
                        "model_version": "0.1",
                        scaleFactor: 1,
                    },
                },
            },
        },
    ],

    false: [
        {
           "com.animaapp.stc-sketch-plugin": {
                kModelPropertiesKey: {
                    constraints: {
                        aspectRatio: {
                            constant: 64,
                            enabled: 1,
                            modelID: "constraint_12e67d56-c43c-4aa2-98b5-772062df3ab9",
                            model_class: "ADModelConstraint",
                            model_version: "0.1",
                            multiplier: 64,
                        },
                        automatic: 1,
                        modelID: "viewConstraints_e61bb364-9ad2-42d7-8dea-be98fce24b3f",
                        model_class: "ADModelViewConstraints",
                        model_version: "0.1",
                        scaleFactor: 1,
                    },
                },
            },
        },
    ],

}
