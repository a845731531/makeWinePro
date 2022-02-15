
const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingStoreYearChoose extends cc.Component {

    @property(cc.Toggle)
    threeToggle: cc.Toggle = null;
    @property(cc.Toggle)
    otherToggle: cc.Toggle = null;
    @property(cc.EditBox)
    yearEdit: cc.EditBox = null;
    @property(cc.Slider)
    yearSlider: cc.Slider = null;

    @property(cc.Node)
    progreeDown: cc.Node = null;
    @property(cc.Node)
    progreeUp: cc.Node = null;

    @property(cc.Label)
    currentYear: cc.Label = null;
    

    private storeYear: number = 3
    private yearChangeCallback = null

    private slideWidth:number=0

    start(){
       
        this.slideWidth=this.progreeDown.width
    }

    

    setStoreYear(year, needCallback = true) {
        this.storeYear = year
        if(this.yearChangeCallback && needCallback) {
            this.yearChangeCallback(this.storeYear)
        }
        this.threeToggle.isChecked = (this.storeYear == 3)
        this.otherToggle.isChecked = (this.storeYear > 3)
        if(this.otherToggle.isChecked) {
            this.yearSlider.progress = (this.storeYear - 5) / 45
            this.progreeUp.width=this.yearSlider.progress*this.slideWidth
        } else {
            this.yearSlider.progress = 0
            this.progreeUp.width=0
        }


        this.yearEdit.string = "" + this.storeYear
        this.currentYear.string = "" + this.storeYear
    }
    
    addYearChangedListener(callback) {
        this.yearChangeCallback = callback
    }

    onSelectYear(event, year) {
        this.setStoreYear(parseInt(year))
    }
    onYearSliderChanged(slider: cc.Slider) {
        let year = Math.round(slider.progress * 45) + 5
        this.setStoreYear(year)
    }
    onEditYear() {
        let editYear = parseInt(this.yearEdit.string)
        editYear = Math.min(50, editYear)
        editYear = Math.max(5, editYear)
        this.setStoreYear(editYear)
    }
}