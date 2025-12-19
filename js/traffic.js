(function () {
  var numberFormat = d3.format(",d");

  function sanitizeText(value, fallback) {
    if (!value) return fallback;
    var trimmed = value.replace(/\s+/g, " ").trim();
    return trimmed || fallback;
  }

  function buildFilterLabel(group, label) {
    var active = group.all().filter(function (d) {
      return d.value > 0;
    }).length;
    return label + " " + active + " / " + group.all().length;
  }

  d3.csv("./本市A1及A2類道路交通事故-按肇事場所別(113年).csv", function (err, rows) {
    if (err) {
      throw err;
    }

    var data = rows.map(function (d) {
      return {
        year: +d.year,
        bureau: sanitizeText(d.breau, "未提供"),
        locationType: sanitizeText(d.location_type, "未提供"),
        count: +d.count,
      };
    });

    var ndx = crossfilter(data);
    var totalAccidents = ndx.groupAll().reduceSum(function (d) {
      return d.count;
    });

    var locationDim = ndx.dimension(function (d) {
      return d.locationType;
    });
    var locationGroup = locationDim.group().reduceSum(function (d) {
      return d.count;
    });

    var bureauDim = ndx.dimension(function (d) {
      return d.bureau;
    });
    var bureauGroup = bureauDim.group().reduceSum(function (d) {
      return d.count;
    });

    var recordDim = ndx.dimension(function (d) {
      return d.bureau + "|" + d.locationType;
    });

    var locationChart = dc.rowChart("#LocationTypeChart");
    locationChart
      .width(520)
      .height(420)
      .dimension(locationDim)
      .group(locationGroup)
      .elasticX(true)
      .gap(4)
      .ordering(function (d) {
        return -d.value;
      })
      .controlsUseVisibility(true)
      .margins({ top: 10, right: 10, bottom: 30, left: 100 })
      .title(function (d) {
        return d.key + "：" + numberFormat(d.value) + " 件";
      })
      .label(function (d) {
        return d.key;
      });
    locationChart.xAxis().ticks(5);

    var bureauChart = dc.barChart("#BureauChart");
    var bureauDomain = bureauGroup
      .all()
      .map(function (d) {
        return d.key;
      })
      .sort(d3.ascending);

    bureauChart
      .width(520)
      .height(420)
      .dimension(bureauDim)
      .group(bureauGroup)
      .x(d3.scale.ordinal().domain(bureauDomain))
      .xUnits(dc.units.ordinal)
      .elasticY(true)
      .gap(6)
      .renderHorizontalGridLines(true)
      .controlsUseVisibility(true)
      .margins({ top: 10, right: 10, bottom: 80, left: 50 })
      .title(function (d) {
        return d.key + "：" + numberFormat(d.value) + " 件";
      })
      .centerBar(true)
      .barPadding(0.1)
      .outerPadding(0.05)
      .ordering(function (d) {
        return d.key;
      });
    bureauChart.yAxis().ticks(6);
    bureauChart.xAxis().tickFormat(function (d) {
      return d;
    });

    var table = dc.dataTable("#AccidentTable");
    table
      .dimension(recordDim)
      .group(function () {
        return "113 年 A1/A2 事故筆數";
      })
      .size(50)
      .columns([
        {
          label: "轄區",
          format: function (d) {
            return d.bureau;
          },
        },
        {
          label: "肇事場所",
          format: function (d) {
            return d.locationType;
          },
        },
        {
          label: "事故件數",
          format: function (d) {
            return numberFormat(d.count);
          },
        },
      ])
      .sortBy(function (d) {
        return -d.count;
      })
      .order(d3.ascending)
      .on("renderlet", function (table) {
        table.selectAll("tr.dc-table-group").style("font-weight", "bold");
      });

    function refreshSummary() {
      var bureauActive = bureauGroup
        .all()
        .filter(function (d) {
          return d.value > 0;
        }).length;
      var locationActive = locationGroup
        .all()
        .filter(function (d) {
          return d.value > 0;
        }).length;
      var total = totalAccidents.value();
      var average = bureauActive ? Math.round(total / bureauActive) : 0;

      d3.select("#TotalCount").text(numberFormat(total));
      d3.select("#AveragePerBureau").text(numberFormat(average));
      d3.select("#FilterState").text(
        buildFilterLabel(bureauGroup, "轄區") +
          " / " +
          buildFilterLabel(locationGroup, "肇事場所")
      );
    }

    dc.renderAll();
    refreshSummary();

    dc.chartRegistry.list().forEach(function (chart) {
      chart.on("filtered", function () {
        refreshSummary();
      });
    });
  });
})();
