"use strict";
! function() {
    let o, r, t, e, s;
    s = (isDarkStyle ? (o = config.colors_dark.cardColor, r = config.colors_dark.textMuted, t = config.colors_dark.borderColor, e = config.colors_dark.chartBgColor, config.colors_dark) : (o = config.colors.cardColor, r = config.colors.textMuted, t = config.colors.borderColor, e = config.colors.chartBgColor, config.colors)).bodyColor;
    var i = document.querySelector("#weeklyOverviewChart"),
        a = {
            chart: {
                type: "bar",
                height: 200,
                offsetY: -9,
                offsetX: -16,
                parentHeightOffset: 0,
                toolbar: {
                    show: !1
                }
            },
            series: [{
                name: "Sales",
                data: [32, 55, 45, 75, 55, 35, 70]
            }],
            colors: [e],
            plotOptions: {
                bar: {
                    borderRadius: 8,
                    columnWidth: "30%",
                    endingShape: "rounded",
                    startingShape: "rounded",
                    colors: {
                        ranges: [{
                            from: 75,
                            to: 80,
                            color: config.colors.primary
                        }, {
                            from: 0,
                            to: 73,
                            color: e
                        }]
                    }
                }
            },
            dataLabels: {
                enabled: !1
            },
            legend: {
                show: !1
            },
            grid: {
                strokeDashArray: 8,
                borderColor: t,
                padding: {
                    bottom: -10
                }
            },
            xaxis: {
                categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                tickPlacement: "on",
                labels: {
                    show: !1
                },
                axisBorder: {
                    show: !1
                },
                axisTicks: {
                    show: !1
                }
            },
            yaxis: {
                min: 0,
                max: 90,
                show: !0,
                tickAmount: 3,
                labels: {
                    formatter: function(o) {
                        return parseInt(o) + "K"
                    },
                    style: {
                        fontSize: "0.75rem",
                        fontFamily: "Inter",
                        colors: r
                    }
                }
            },
            states: {
                hover: {
                    filter: {
                        type: "none"
                    }
                },
                active: {
                    filter: {
                        type: "none"
                    }
                }
            },
            responsive: [{
                breakpoint: 1500,
                options: {
                    plotOptions: {
                        bar: {
                            columnWidth: "40%"
                        }
                    }
                }
            }, {
                breakpoint: 1200,
                options: {
                    plotOptions: {
                        bar: {
                            columnWidth: "30%"
                        }
                    }
                }
            }, {
                breakpoint: 815,
                options: {
                    plotOptions: {
                        bar: {
                            borderRadius: 5
                        }
                    }
                }
            }, {
                breakpoint: 768,
                options: {
                    plotOptions: {
                        bar: {
                            borderRadius: 10,
                            columnWidth: "20%"
                        }
                    }
                }
            }, {
                breakpoint: 568,
                options: {
                    plotOptions: {
                        bar: {
                            borderRadius: 8,
                            columnWidth: "30%"
                        }
                    }
                }
            }, {
                breakpoint: 410,
                options: {
                    plotOptions: {
                        bar: {
                            columnWidth: "50%"
                        }
                    }
                }
            }]
        },
        i = (null !== i && new ApexCharts(i, a).render(), document.querySelector("#totalProfitLineChart")),
        a = {
            chart: {
                height: 90,
                type: "line",
                parentHeightOffset: 0,
                toolbar: {
                    show: !1
                }
            },
            grid: {
                borderColor: r,
                strokeDashArray: 6,
                xaxis: {
                    lines: {
                        show: !0
                    }
                },
                yaxis: {
                    lines: {
                        show: !1
                    }
                },
                padding: {
                    top: -15,
                    left: -7,
                    right: 9,
                    bottom: -15
                }
            },
            colors: [config.colors.primary],
            stroke: {
                width: 3
            },
            series: [{
                data: [0, 20, 5, 30, 15, 45]
            }],
            tooltip: {
                shared: !1,
                intersect: !0,
                x: {
                    show: !1
                }
            },
            tooltip: {
                enabled: !1
            },
            xaxis: {
                labels: {
                    show: !1
                },
                axisTicks: {
                    show: !1
                },
                axisBorder: {
                    show: !1
                }
            },
            yaxis: {
                labels: {
                    show: !1
                }
            },
            markers: {
                size: 6,
                strokeWidth: 3,
                strokeWidth: 3,
                strokeColors: "transparent",
                colors: ["transparent"],
                discrete: [{
                    seriesIndex: 0,
                    dataPointIndex: 5,
                    fillColor: o,
                    strokeColor: config.colors.primary,
                    size: 6,
                    shape: "circle"
                }],
                hover: {
                    size: 7
                }
            },
            responsive: [{
                breakpoint: 1350,
                options: {
                    chart: {
                        height: 80
                    }
                }
            }, {
                breakpoint: 1200,
                options: {
                    chart: {
                        height: 100
                    }
                }
            }, {
                breakpoint: 768,
                options: {
                    chart: {
                        height: 110
                    }
                }
            }]
        },
        i = (null !== i && new ApexCharts(i, a).render(), document.querySelector("#sessionsColumnChart")),
        a = {
            chart: {
                height: 90,
                parentHeightOffset: 0,
                type: "bar",
                toolbar: {
                    show: !1
                }
            },
            tooltip: {
                enabled: !1
            },
            plotOptions: {
                bar: {
                    barHeight: "100%",
                    columnWidth: "20px",
                    startingShape: "rounded",
                    endingShape: "rounded",
                    borderRadius: 4,
                    colors: {
                        ranges: [{
                            from: 25,
                            to: 32,
                            color: config.colors.danger
                        }, {
                            from: 60,
                            to: 75,
                            color: config.colors.primary
                        }, {
                            from: 45,
                            to: 50,
                            color: config.colors.danger
                        }, {
                            from: 35,
                            to: 42,
                            color: config.colors.primary
                        }],
                        backgroundBarColors: [e, e, e, e, e],
                        backgroundBarRadius: 4
                    }
                }
            },
            grid: {
                show: !1,
                padding: {
                    top: -10,
                    left: -10,
                    bottom: -15
                }
            },
            dataLabels: {
                enabled: !1
            },
            legend: {
                show: !1
            },
            xaxis: {
                labels: {
                    show: !1
                },
                axisTicks: {
                    show: !1
                },
                axisBorder: {
                    show: !1
                }
            },
            yaxis: {
                labels: {
                    show: !1
                }
            },
            series: [{
                data: [30, 70, 50, 40, 60]
            }],
            responsive: [{
                breakpoint: 1350,
                options: {
                    chart: {
                        height: 80
                    },
                    plotOptions: {
                        bar: {
                            columnWidth: "40%"
                        }
                    }
                }
            }, {
                breakpoint: 1200,
                options: {
                    chart: {
                        height: 100
                    },
                    plotOptions: {
                        bar: {
                            columnWidth: "20%"
                        }
                    }
                }
            }, {
                breakpoint: 768,
                options: {
                    chart: {
                        height: 110
                    },
                    plotOptions: {
                        bar: {
                            columnWidth: "10%"
                        }
                    }
                }
            }, {
                breakpoint: 480,
                options: {
                    plotOptions: {
                        bar: {
                            columnWidth: "20%"
                        }
                    }
                }
            }]
        },
        i = (null !== i && new ApexCharts(i, a).render(), document.querySelector("#performanceChart")),
        a = {
            chart: {
                height: 310,
                type: "radar",
                offsetY: 10,
                toolbar: {
                    show: !1
                }
            },
            legend: {
                show: !0,
                position: "bottom",
                offsetY: 10,
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2
                },
                itemMargin: {
                    horizontal: 10,
                    vertical: 8
                },
                fontFamily: "Inter",
                fontSize: "12px",
                labels: {
                    colors: s,
                    useSeriesColors: !1
                }
            },
            plotOptions: {
                radar: {
                    polygons: {
                        strokeColors: t,
                        connectorColors: t
                    }
                }
            },
            yaxis: {
                show: !1
            },
            series: [{
                name: "Income",
                data: [70, 90, 80, 95, 75, 90]
            }, {
                name: "Net Worth",
                data: [110, 78, 95, 85, 95, 78]
            }],
            colors: [config.colors.primary, config.colors.info],
            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                labels: {
                    show: !0,
                    style: {
                        colors: [r, r, r, r, r, r],
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontWeight: 400
                    }
                }
            },
            fill: {
                opacity: [1, .9]
            },
            stroke: {
                show: !1,
                width: 0
            },
            markers: {
                size: 0
            },
            grid: {
                show: !1,
                padding: {
                    bottom: -10
                }
            }
        };
    null !== i && new ApexCharts(i, a).render()
}();