import React from 'react';
import {connect} from 'react-redux';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

class SharePage extends React.Component{
    constructor(props){
        super(props);

        this.state ={
            noCommentsCopied: false,
            withCommentsCopies: false,
            creatingPdf:false
        }
    }

    onPdfClick = () => {

        this.setState(() => ({creatingPdf:true}));

        const complete = () => {
            this.setState(() => ({creatingPdf: false}));
        }

        //ADDUX HTML
        const addux = document.createElement('div');
        addux.id='pdf';
        addux.className='addux-pdf';

        //ADDUX LOGO
        const adduxLogo= document.createElement('img');
        adduxLogo.className='addux-pdf__logo';
        adduxLogo.src = 'img/addux-logo.png';

        //ADDUX TITLE
        const adduxTitle = document.createElement('h1');
        adduxTitle.className='addux-pdf__title';
        adduxTitle.appendChild(document.createTextNode(this.props.activeAddux.name));

        //PDF HEADER
        const adduxHeader = document.createElement('div');
        adduxHeader.className='addux-pdf__header';
        adduxHeader.appendChild(adduxLogo);
        adduxHeader.appendChild(adduxTitle);

        //WRAPPER DIV FOR COLUMNS
        const adduxColumns = document.createElement('div');
        adduxColumns.className='addux-pdf__columns';

        //OBJECTIVE HEADER
        const objectiveHeader = document.createElement('h1');
        objectiveHeader.className='pdf-column__header';
        objectiveHeader.appendChild(document.createTextNode('12-month Objective'));

        const goalsHeader = document.createElement('h1');
        goalsHeader.className='pdf-column__header';
        goalsHeader.appendChild(document.createTextNode('Goals'));

        const projectsHeader = document.createElement('h1');
        projectsHeader.className='pdf-column__header';
        projectsHeader.appendChild(document.createTextNode('Projects'));

        const timelinesHeader = document.createElement('h1');
        timelinesHeader.className='pdf-column__header';
        timelinesHeader.appendChild(document.createTextNode('Timelines'));

        const resourcesHeader = document.createElement('h1');
        resourcesHeader.className='pdf-column__header';
        resourcesHeader.appendChild(document.createTextNode('Resources'));

        const ownerHeader = document.createElement('h1');
        ownerHeader.className='pdf-column__header';
        ownerHeader.appendChild(document.createTextNode('Project Owner'));

        const progressHeader = document.createElement('h1');
        progressHeader.className='pdf-column__header';
        progressHeader.appendChild(document.createTextNode('Progress Updates'));

        //OBJECTIVE BOXES WRAPPER
        const objectiveBoxes = document.createElement('div');
        objectiveBoxes.className='pdf-column__boxes';

        const goalsBoxes = document.createElement('div');
        goalsBoxes.className='pdf-column__boxes';

        const projectsBoxes = document.createElement('div');
        projectsBoxes.className='pdf-column__boxes';

        const timelinesBoxes = document.createElement('div');
        timelinesBoxes.className='pdf-column__boxes';

        const resourcesBoxes = document.createElement('div');
        resourcesBoxes.className='pdf-column__boxes';

        const ownerBoxes = document.createElement('div');
        ownerBoxes.className='pdf-column__boxes';

        const progressBoxes = document.createElement('div');
        progressBoxes.className='pdf-column__boxes';

        //OBJECTIVE BOXES
        const objectiveBox = document.createElement('p');
        objectiveBox.className='pdf-column__box pdf-column__box--objective';
        objectiveBox.appendChild(document.createTextNode(this.props.activeAddux.objective));
        objectiveBoxes.appendChild(objectiveBox);

        let goalsBox;
        for(let i = 0; i < 3; i++){
            goalsBox = document.createElement('p');
            goalsBox.className='pdf-column__box pdf-column__box--goals';
            goalsBox.appendChild(document.createTextNode(this.props.activeAddux[`goals_${i+1}`]));
            goalsBoxes.appendChild(goalsBox);
        }

        let projectsBox;
        for(let i = 0; i < 9; i++){
            projectsBox = document.createElement('p');
            projectsBox.className='pdf-column__box';
            projectsBox.appendChild(document.createTextNode(this.props.activeAddux[`projects_${i+1}`]));
            projectsBoxes.appendChild(projectsBox);
        }

        let timelinesBox;
        for(let i = 0; i < 9; i++){
            timelinesBox = document.createElement('p');
            timelinesBox.className='pdf-column__box';
            timelinesBox.appendChild(document.createTextNode(this.props.activeAddux[`timelines_${i+1}`]));
            timelinesBoxes.appendChild(timelinesBox);
        }

        let resourcesBox;
        for(let i = 0; i < 9; i++){
            resourcesBox = document.createElement('p');
            resourcesBox.className='pdf-column__box';
            resourcesBox.appendChild(document.createTextNode(this.props.activeAddux[`resources_${i+1}`]));
            resourcesBoxes.appendChild(resourcesBox);
        }

        let ownerBox;
        for(let i = 0; i < 9; i++){
            ownerBox = document.createElement('p');
            ownerBox.className='pdf-column__box';
            ownerBox.appendChild(document.createTextNode(this.props.activeAddux[`projectOwner_${i+1}`]));
            ownerBoxes.appendChild(ownerBox);
        }

        let progressBox;
        for(let i = 0; i < 9; i++){
            progressBox = document.createElement('p');
            progressBox.className='pdf-column__box';
            progressBox.appendChild(document.createTextNode(this.props.activeAddux[`progress_${i+1}`]));
            progressBoxes.appendChild(progressBox);
        }

        //OJECTIVE COLUMN
        const objectiveColumn = document.createElement('div');
        objectiveColumn.className='pdf-column';
        objectiveColumn.appendChild(objectiveHeader);
        objectiveColumn.appendChild(objectiveBoxes);

        //GOALS COLUMN
        const goalsColumn = document.createElement('div');
        goalsColumn.className='pdf-column';
        goalsColumn.appendChild(goalsHeader);
        goalsColumn.appendChild(goalsBoxes);

        //PROJECTS COLUMN
        const projectsColumn = document.createElement('div');
        projectsColumn.className='pdf-column';
        projectsColumn.appendChild(projectsHeader);
        projectsColumn.appendChild(projectsBoxes);

        //TIMELINES COLUMN
        const timelinesColumn = document.createElement('div');
        timelinesColumn.className='pdf-column';
        timelinesColumn.appendChild(timelinesHeader);
        timelinesColumn.appendChild(timelinesBoxes);

        //RESOURCES COLUMN
        const resourcesColumn = document.createElement('div');
        resourcesColumn.className='pdf-column';
        resourcesColumn.appendChild(resourcesHeader);
        resourcesColumn.appendChild(resourcesBoxes)

        //PROJECT OWNER COLUMN
        const projectOwnerColumn = document.createElement('div');
        projectOwnerColumn.className='pdf-column';
        projectOwnerColumn.appendChild(ownerHeader);
        projectOwnerColumn.appendChild(ownerBoxes);

        //PROGRESS UPDATES COLUMN
        const progressColumn = document.createElement('div');
        progressColumn.className='pdf-column';
        progressColumn.appendChild(progressHeader);
        progressColumn.appendChild(progressBoxes);

        adduxColumns.appendChild(objectiveColumn);
        adduxColumns.appendChild(goalsColumn);
        adduxColumns.appendChild(projectsColumn);
        adduxColumns.appendChild(timelinesColumn);
        adduxColumns.appendChild(resourcesColumn);
        adduxColumns.appendChild(projectOwnerColumn);
        adduxColumns.appendChild(progressColumn);

        //FOOTER LOGO
        const footerLogo = document.createElement('img');
        footerLogo.className = 'addux-pdf__footer';
        footerLogo.src = 'img/cypress-product.png';
        //footerLogo.appendChild(document.createTextNode('A product of Cypress Resources'));

        addux.appendChild(adduxHeader);
        addux.appendChild(adduxColumns);
        addux.appendChild(footerLogo);


        // const style = addux.style;
        // style.position = 'relative';
        // style.top = window.innerHeight+'px';
        // style.left=0;

        document.getElementsByTagName('body')[0].append(addux);

        const name = this.props.activeAddux.name;

        const toPrint = document.getElementById('pdf');

        html2canvas(addux, {windowWidth:3000, windowHeight:3000, width:3000, height:3000, scale:1}).then(function(canvas) {

            const pdfNode = document.getElementById('pdf');
            pdfNode.parentNode.removeChild(pdfNode);

            const pdf = new jsPDF({orientation: 'landscape', format:'tabloid'});
            pdf.addImage(canvas.toDataURL('image/png', 1.0), 'PNG', 0, 0);
            
            pdf.save(`${name}.pdf`);

            complete();

        })

    }

    //PDF button to remove later
    //<button className='btn btn--width-200 share-page__pdf-buton' onClick={this.onPdfClick} disabled={this.state.creatingPdf}>{this.state.creatingPdf ? (<img className='btn__loading' src='img/loading.gif' />) : ('Download as PDF')}</button>

    render(){
        const shareURL = `${window.location.href}share/${this.props.activeAddux._id}`;
        const commentURL = `${window.location.href}comment/${this.props.activeAddux._id}`;

        //<button className='app-overlay__close' onClick={props.changeShareActive}>Close</button>

        return (
            <div className='share-page'>
                <h1 className='primary-heading'>Share Your addux</h1>
                
                <div className='share-page__box'>
                    <p className='share-page__text'>Use this link to share a copy of this addux <span className='underline'>without</span> comments: <input type='text' value={shareURL} readOnly={true}/></p>
                    <CopyToClipboard text={shareURL}
                        onCopy={() => {this.setState(() => { return {noCommentsCopied:true, withCommentsCopied:false}})}}>
                        <span className='btn btn--full-width share-page__button'>Copy to clipboard</span>
                    </CopyToClipboard>
                    <p className={`alert alert--success share-page__alert ${this.state.noCommentsCopied ? 'share-page__alert--reveal' : ''}`}>Link Copied to Clipboard!</p>
                </div>
                <div className='share-page__box'>
                    <p className='share-page__text'>Use this link to share a copy of this addux <span className='underline'>with</span> comments:  <input type='text' value={commentURL} readOnly={true}/></p>
                    <CopyToClipboard text={commentURL}
                        onCopy={() => {this.setState(() => { return {noCommentsCopied:false, withCommentsCopied:true}})}}>
                        <span className='btn btn--full-width share-page__button'>Copy to clipboard</span>
                    </CopyToClipboard>
                    <p className={`alert alert--success share-page__alert ${this.state.withCommentsCopied ? 'share-page__alert--reveal' : ''}`}>Link Copied to Clipboard!</p>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        activeAddux : state.addux[state.addux.active]
    }
};


export default connect(mapStateToProps)(SharePage);

//export default SharePage;