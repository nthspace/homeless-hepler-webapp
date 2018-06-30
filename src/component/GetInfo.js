import React from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { withStyles } from '@material-ui/core/styles';

import { Link as Rlink} from 'react-router-dom';


const styles = {
  confirmButton: {
    color: '#F7B815',
    fontWeight: '200'
  },
  cancleButton: {
  	color: '#666666',
  	fontWeight: '200'
  },
  button: {
  	backgroundColor: '#F7B815'
  }
};

class GetInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			giverType:'individual',
			openCancelDialog:false,
			open: false,
			errors: []
		};
		this.nextStep = this.nextStep.bind(this);
		this.changeType = this.changeType.bind(this);
		this.validate = this.validate.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleCancelDialogOpen = this.handleCancelDialogOpen.bind(this);
		this.handleCancelDialogClose = this.handleCancelDialogClose.bind(this);
	}

	validate() {
		const errors = [];
		if (this.state.giverType === 'group') {
			if ( this.refs.name.value === "") {
				errors.push("尚未填寫團體名稱");
			};
		};
		if (this.refs.contactName.value === "") {
			errors.push("尚未填寫聯絡人");
		};
		if (this.refs.email.value === "") {
			errors.push("尚未填寫電子信箱");
		};
		if (this.refs.phone.value === "") {
			errors.push("尚未填寫聯絡電話");
		};
		return errors;
	}

	nextStep(event) {
		event.preventDefault();
		const errors = this.validate();
			if (errors.length > 0) {
				this.setState({ errors });
				this.setState({ open: true })
				return;
			} else {
				const data = {
						giver:{
						    type: this.refs.type.value,
						    name: this.refs.name.value,
						    email: this.refs.email.value,
						    phone: this.refs.phone.value,
						    contactName: this.refs.contactName.value,
						    contactTitle: this.refs.contactTitle.value
						}
				};
				this.props.saveValues(data);
				this.props.handleNext();
			}
	}

	changeType(event) {
		event.preventDefault();
		this.setState({
			giverType: event.target.value
		});
	}

	handleClose = () => {
	this.setState({ open: false });
	}

	handleCancelDialogOpen = (event) =>{
		this.setState({ openCancelDialog: true });
	}

	handleCancelDialogClose = (event) => {
		this.setState({ openCancelDialog: false });
	}

	render () {
		return (
			<div>
			<div className="form-frame">
		        <div className="form-one">
		          <div className="form-title">請填寫您的身份與聯絡資訊</div>
					<div className="form-info">
						<div className="info">
							<h2>身份</h2>
							<select 
								type="text" 
								ref="type" 
								defaultValue={this.props.fieldValues.giver.type}
								onChange={this.changeType}
							>
								<option value="individual">個人</option>
								<option value="group">團體</option>
							</select>
							<i className="fas fa-sort-down"></i>
						</div>
						{this.state.giverType === 'individual' ? 
							<input ref="name" className="none"/> :  													
							<div className="info">
								<h2>團體名稱</h2>
								<input 
									type="text" 
									ref="name"
									placeholder="團體名稱" 
									defaultValue={this.props.fieldValues.giver.name}
								/>
							</div>}
						<div className="info">
							<h2>聯絡人</h2>
							<input 
								type="text" 
								ref="contactName" 
								placeholder="姓名" 
								defaultValue={this.props.fieldValues.giver.contactName}
							/>
							<select 
								type="text" 
								ref="contactTitle"
								defaultValue={this.props.fieldValues.giver.contactTitle}
								className="padding" 
							>
								<option value="mr">先生</option>
								<option value="miss">女士</option>
							</select>
							<i className="fas fa-sort-down"></i>
						</div>

						<div className="info">
							<h2>電子信箱</h2> 
							<input 
								type="text" 
								ref="email"
								placeholder="電子信箱" 
								defaultValue={this.props.fieldValues.giver.email}
								className="more-width"
							/>
						</div>

						<div className="info">
							<h2>電話</h2>
							<input 
								type="text" 
								ref="phone"
								placeholder="電話"  
								defaultValue={this.props.fieldValues.giver.phone}
							/>
							<h4>人生百味工作人員可能會在事後與您電話連絡確認捐贈事宜</h4>
						</div>
					</div>
		            </div>
	            </div>
	            {/* 按鈕 */}
	            <Grid container direction="row" justify="space-between">
	              <Button variant="outlined" onClick={this.props.handleBack} className="formbutton-back">
	                <i className="fas fa-arrow-left"></i> 
	                上一步</Button>
	              <Hidden smUp>
	              	<div className="cancle-log" onClick={this.handleCancelDialogOpen}>取消登記</div>
	              </Hidden>
	              <div className="button-right-block">
	                <Hidden xsDown>
	                	<div className="cancle-log" onClick={this.handleCancelDialogOpen}>取消登記</div>
	                </Hidden>
	                <Button variant="contained" color="primary" onClick={this.nextStep} className={`formbutton-next ${this.props.classes.button}`}>
	                  下一步
	                  <i className="fas fa-arrow-right"></i></Button>
	              </div>
	            </Grid>
				{/*輸入檢查訊息 */}
		        <Dialog
		          open={this.state.open}
		          onClose={this.handleClose}
		          aria-labelledby="alert-dialog-title"
		          aria-describedby="alert-dialog-description"
		        >
		          <DialogContent>
		            <DialogContentText id="alert-dialog-description">
		            	{this.state.errors.map(error => (
				          <p key={error}>{error}</p>
				        ))}
		            </DialogContentText>
		          </DialogContent>
		          <DialogActions>
		            <Button onClick={this.handleClose} color="primary" autoFocus>
		              Ok
		            </Button>
		          </DialogActions>
		        </Dialog>
		    	{/*取消確認視窗 */}
		        <Dialog
		          open={this.state.openCancelDialog}
		          onClose={this.handleCancelDialogClose}
		          aria-labelledby="alert-dialog-title"
		          aria-describedby="alert-dialog-description"
		        >
		          <DialogContent>
		            <DialogContentText id="alert-dialog-description">
		            	您即將取消登記，已經填的資料可能會遺失。
		            </DialogContentText>
		          </DialogContent>
		          <DialogActions>
		            <Button onClick={this.handleCancelDialogClose} className={this.props.classes.confirmButton} autoFocus>
		              繼續登記
		            </Button>
		            <Rlink to="/">
			            <Button className={this.props.classes.cancleButton} autoFocus>
			              取消登記
			            </Button>
		            </Rlink>
		          </DialogActions>
		        </Dialog>
            </div>
		);
	}
}

export default  withStyles(styles)(GetInfo);