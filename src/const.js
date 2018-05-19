
const widthStatic = 'width';
const widthAddition = 'width-addition';
const widthPercentage = 'width-percentage';
const widthPercentageFull = 'width-percentage-full';
const widthMin = 'width-min';
const heightStatic = 'height';
const heightAddition = 'height-addition';
const heightPercentage = 'height-percentage';
const heightPercentageFull = 'height-percentage-full';
const heightMin = 'height-min';
const paddingTop = 'padding-top';
const paddingRight = 'padding-right';
const paddingBottom = 'padding-bottom';
const paddingLeft = 'padding-left';
const marginTop = 'margin-top';
const marginRight = 'margin-right';
const marginBottom = 'margin-bottom';
const marginLeft = 'margin-left';
const stackHorizontallyTop = 'stack-horizontally-top';
const stackHorizontallyMiddle = 'stack-horizontally-middle';
const stackHorizontallyBottom = 'stack-horizontally-bottom';
const stackVerticallyLeft = 'stack-vertically-left';
const stackVerticallyCenter = 'stack-vertically-center';
const stackVerticallyRight = 'stack-vertically-right';
const centerHorizontally = 'center-horizontally';
const centerVertically = 'center-vertically';

const priority = [
    stackHorizontallyMiddle,
    stackHorizontallyBottom,
    stackHorizontallyTop,
    stackVerticallyCenter,
    stackVerticallyLeft,
    stackVerticallyRight,
    widthStatic,
    widthPercentage,
    widthPercentageFull,
    widthAddition,
    widthMin,
    heightStatic,
    heightPercentage,
    heightPercentageFull,
    heightAddition,
    heightMin,
    centerHorizontally,
    centerVertically,
    marginRight,
    marginBottom,
    marginTop,
    marginLeft,
    paddingRight,
    paddingBottom,
    paddingTop,
    paddingLeft,
];

// -----------------------------------------------------------

module.exports = {
    alignment: {
        rawValue: {
            top: 'top',
            middle: 'middle',
            bottom: 'bottom',
            left: 'left',
            center: 'center',
            right: 'right',
        },
    },
    properties: {
        re: {
            include: new RegExp('\\[([^\\]]+)\\]'),
            ignore: /\[ignore\]/i,
            padding: /^\d+$/,
            containerName: /(bg|container)/i,
        },
        priority,
        sep: ':',
    },
    property: {
        type: {
            center: 'center',
            margin: 'margin',
            padding: 'padding',
            size: 'size',
            stack: 'stack',
        },
        key: {
            widthStatic,
            widthAddition,
            widthPercentage,
            widthPercentageFull,
            widthMin,
            heightStatic,
            heightAddition,
            heightPercentage,
            heightPercentageFull,
            heightMin,
            paddingTop,
            paddingRight,
            paddingBottom,
            paddingLeft,
            marginTop,
            marginRight,
            marginBottom,
            marginLeft,
            stackHorizontallyTop,
            stackHorizontallyMiddle,
            stackHorizontallyBottom,
            stackVerticallyLeft,
            stackVerticallyCenter,
            stackVerticallyRight,
            centerHorizontally,
            centerVertically,
        },
    },
    class: {
        artboard: 'MSArtboardGroup',
        group: 'MSLayerGroup',
        shape: 'MSShapeGroup',
        symbolInstance: 'MSSymbolInstance',
        symbolMaster: 'MSSymbolMaster',
        text: 'MSTextLayer',
    },
};
