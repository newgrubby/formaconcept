"use client"; import React from "react";
export class WebGLBoundary extends React.Component<{fallback:React.ReactNode;onError:()=>void;children:React.ReactNode},{failed:boolean}>{state={failed:false};static getDerivedStateFromError(){return{failed:true}}componentDidCatch(){this.props.onError()}render(){return this.state.failed?this.props.fallback:this.props.children}}
